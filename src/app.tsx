import fs from "node:fs";
import path from "node:path";
import express, {
  type ErrorRequestHandler,
  type Request,
  type Response,
} from "express";
import { z } from "zod";
import { isProduction } from "./env";
import { httpLogger } from "./lib/http-logger";
import { logger } from "./lib/logger";
import { renderReportHtml } from "./pdf/render-html";
import { htmlToPdf } from "./pdf/weasyprint";
import { reports } from "./reports";

const STYLES_PATH = path.resolve("dist/styles.css");

/**
 * O CSS do Tailwind (`npm run build:css`). Em produção é lido uma vez; no dev,
 * a cada request, para pegar o que o `tailwindcss --watch` regerou.
 */
function stylesLoader(): () => string {
  const read = () => {
    try {
      return fs.readFileSync(STYLES_PATH, "utf8");
    } catch {
      logger.warn(`${STYLES_PATH} não existe: rode npm run build:css`);
      return "";
    }
  };
  if (!isProduction) return read;
  const styles = read();
  return () => styles;
}

export function createApp() {
  const styles = stylesLoader();
  const app = express();

  app.use(express.json({ limit: "5mb" }));
  app.use(httpLogger);

  app.get("/health", (_req, res) => {
    res.send("ok");
  });

  async function generate(type: string, req: Request, res: Response) {
    const report = reports[type];
    if (!report) {
      res.status(404).json({ message: `Relatório "${type}" não existe` });
      return;
    }

    const parsed = report.schema.safeParse(req.body);
    if (!parsed.success) {
      logger.warn(`Payload inválido (${type}): ${z.prettifyError(parsed.error)}`);
      res.status(400).json({
        message: "Payload inválido",
        issues: parsed.error.issues,
      });
      return;
    }

    const html = renderReportHtml(report, parsed.data, { styles: styles() });
    const pdf = await htmlToPdf(html);

    res
      .type("application/pdf")
      .attachment(`${report.name(parsed.data)}.pdf`)
      .send(pdf);
  }

  app.post("/reports/:type", (req, res) => generate(req.params.type, req, res));

  // Rota antiga, que o seaps-api (REPORT_URL) ainda chama.
  app.post("/", (req, res) => generate("checklist", req, res));

  // Fora de produção: o HTML com o payload de exemplo, para ajustar o layout
  // no navegador (o Paged.js simula as páginas e o rodapé).
  if (!isProduction) {
    app.get("/reports/:type/preview", (req, res) => {
      const report = reports[req.params.type];
      if (!report) {
        res.status(404).send(`Relatório "${req.params.type}" não existe`);
        return;
      }
      const data = report.schema.parse(report.sample);
      res.send(
        renderReportHtml(report, data, { styles: styles(), preview: true }),
      );
    });
  }

  const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
    // Erros do express.json (JSON malformado, corpo grande demais).
    const status: number = error.status ?? error.statusCode ?? 500;
    if (status < 500) {
      res.status(status).json({ message: error.message });
      return;
    }
    logger.error(error.stack ?? String(error));
    res.status(500).send("Erro ao gerar PDF.");
  };
  app.use(errorHandler);

  return app;
}

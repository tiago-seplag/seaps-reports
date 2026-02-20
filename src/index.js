import express from "express";
import path from "path";
import fs from "fs";
import { configDotenv } from "dotenv";

import { renderToString } from "react-dom/server";
import { Report } from "./views/report";
import morganMiddleware from "./middlewares/morgan";
import logger from "./utils/logger";
import { generatePDF } from "./utils/pdfGenerator";
import { generateReportHTML } from "./utils/htmlRenderer";

configDotenv();

const app = express();

app.use(express.json());

app.use(express.static("src/public"));

app.use(morganMiddleware);

app.post("/", async (req, res) => {
  const data = req.body;

  try {
    // Renderizar conteúdo React
    const html = renderToString(<Report data={data} />);

    // Carregar e processar CSS
    const cssPath = path.resolve("src/public/outputv3.css");
    const css = fs.readFileSync(cssPath, "utf8");

    // Otimizar CSS para WeasyPrint (remove features incompatíveis)

    // Gerar HTML completo
    const fullHtml = generateReportHTML({
      title: `Relatório SEAPS - ${data.sid}`,
      content: html,
      styles: css,
    });

    // Salvar HTML temporário em desenvolvimento
    if (process.env.NODE_ENV === "development") {
      const tempHtmlPath = path.join(
        `report-${data.sid.replace("/", "-")}.html`,
      );
      fs.writeFileSync(tempHtmlPath, fullHtml);
      logger.info(`Temporary HTML file created at: ${tempHtmlPath}`);
    }

    // Gerar PDF usando WeasyPrint via Python
    const pdfBuffer = await generatePDF(fullHtml);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${data.sid.replace("/", "-")}.pdf`,
    );
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    logger.error(error.message);
    res.status(500).send("Erro ao gerar PDF.");
  }
});

app.get("/", async (req, res) => {
  //busca json de exemplo para renderizar o relatório no navegador

  const data = JSON.parse(fs.readFileSync(path.resolve("report.json"), "utf8"));
  try {
    // Renderizar conteúdo React
    const html = renderToString(<Report data={data} />);

    // Carregar e processar CSS
    const cssPath = path.resolve("src/public/outputv3.css");
    const css = fs.readFileSync(cssPath, "utf8");

    // Otimizar CSS para WeasyPrint (remove features incompatíveis)

    // Gerar HTML completo
    const fullHtml = generateReportHTML({
      title: `Relatório SEAPS - ${data.sid}`,
      content: html,
      styles: css,
    });

    // Salvar HTML temporário em desenvolvimento
    if (process.env.NODE_ENV === "development") {
      const tempHtmlPath = path.join(
        `report-${data.sid.replace("/", "-")}.html`,
      );
      fs.writeFileSync(tempHtmlPath, fullHtml);
      logger.info(`Temporary HTML file created at: ${tempHtmlPath}`);
    }

    if (req.query.view === "html") {
      res.setHeader("Content-Type", "text/html");
      return res.send(fullHtml);
    }

    // Gerar PDF usando WeasyPrint via Python
    const pdfBuffer = await generatePDF(fullHtml);

    res.setHeader(
      "Content-Disposition",
      `inline; filename=${data.sid.replace("/", "-")}.pdf`,
    );
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    logger.error(error.message);
    res.status(500).send("Erro ao gerar PDF.");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  console.log(`http://localhost:${process.env.PORT}/`);
});

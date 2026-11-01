import { spawn } from "node:child_process";
import path from "node:path";
import { env } from "../env";
import { logger } from "../lib/logger";

const SCRIPT = path.resolve("python/html_to_pdf.py");

/**
 * Converte o HTML em PDF com o WeasyPrint (`python/html_to_pdf.py`): o HTML
 * vai pelo stdin e o PDF volta pelo stdout. Mata o processo depois de
 * `PDF_TIMEOUT_MS`.
 */
export function htmlToPdf(html: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const started = Date.now();
    const python = spawn(env.PYTHON_BIN, [SCRIPT], {
      timeout: env.PDF_TIMEOUT_MS,
    });

    const stdout: Buffer[] = [];
    const stderr: Buffer[] = [];
    python.stdout.on("data", (chunk: Buffer) => stdout.push(chunk));
    python.stderr.on("data", (chunk: Buffer) => stderr.push(chunk));

    python.on("error", (error) => {
      reject(new Error(`Erro ao executar ${env.PYTHON_BIN}: ${error.message}`));
    });

    python.on("close", (code, signal) => {
      const errors = Buffer.concat(stderr).toString().trim();
      if (signal) {
        reject(
          new Error(
            `WeasyPrint interrompido (${signal}) depois de ${Date.now() - started} ms`,
          ),
        );
        return;
      }
      if (code !== 0) {
        reject(new Error(`WeasyPrint saiu com código ${code}: ${errors}`));
        return;
      }

      const pdf = Buffer.concat(stdout);
      if (pdf.length === 0) {
        reject(new Error("WeasyPrint gerou um PDF vazio"));
        return;
      }

      // Avisos do WeasyPrint (ex.: foto que não carregou) não impedem o PDF.
      if (errors) logger.warn(`WeasyPrint: ${errors}`);
      logger.info(
        `PDF gerado: ${pdf.length} bytes em ${Date.now() - started} ms`,
      );
      resolve(pdf);
    });

    python.stdin.on("error", (error) => {
      reject(new Error(`Erro ao enviar o HTML ao WeasyPrint: ${error.message}`));
    });
    python.stdin.end(JSON.stringify({ html }));
  });
}

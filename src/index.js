import puppeteer from "puppeteer";
import express from "express";
import path from "path";
import fs from "fs";
import { configDotenv } from "dotenv";

import { renderToString } from "react-dom/server";
import { Report } from "./views/report";
import morganMiddleware from "./middlewares/morgan";
import logger from "./utils/logger";

configDotenv();

const app = express();

app.use(express.json());

app.use(express.static("src/public"));

app.use(morganMiddleware);

app.post("/", async (req, res) => {
  const data = req.body;
  try {
    const html = renderToString(<Report data={data} />);

    const cssPath = path.resolve("src/public/styles.css");
    const styles = fs.readFileSync(cssPath, "utf8");

    const fullHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${data.sid}</title>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link
                  href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                  rel="stylesheet"/>
                <script src="https://cdn.jsdelivr.net/npm/pagedjs/dist/paged.polyfill.min.js" defer></script>
                <style>
                  ${styles}
                </style>
            </head>
            <body>
                <div className="logo-footer">
                <div class="logo-footer">
                  <img src="https://seplag.mt.gov.br/img/LOGO%20SEPLAG%20-%20BRANCO%20(T)%20VAZADO.png" alt="seplag-logo"/>
                </div>
                <div class="footer">
                  <h3>SEAPS</h3>
                  <p>Secretaria Adjunta de Patrimônio e Serviços</p>
                </div>
                <div id="root">${html}</div>
            </body>
            </html>
        `;

    const browser = await puppeteer.launch({
      headless: true,
      pipe: false,
      args: [
        "--headless",
        "--disable-gpu",
        "--full-memory-crash-report",
        "--unlimited-storage",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ], // Importante para servidores Linux e Docker
    });

    const page = await browser.newPage();

    await page.setContent(fullHtml, { waitUntil: "networkidle0", timeout: 0 });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,

      margin: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },
    });

    await browser.close();

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${data.sid.replace("/", "-")}.pdf`,
    );

    res.send(pdfBuffer);
  } catch (error) {
    logger.error(error.message);
    res.status(500).send("Erro ao gerar PDF.");
  }
});

app.get("/view", async (req, res) => {
  const cssPath = path.resolve("src/public/styles.css");
  const html = renderToString(<Report data={data} />);
  const styles = fs.readFileSync(cssPath, "utf8");

  const fullHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>0006/25</title>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link
                  href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                  rel="stylesheet"/>
                <script src="https://cdn.jsdelivr.net/npm/pagedjs/dist/paged.polyfill.min.js"></script>
                <style>
                  ${styles}
                </style>
            </head>
            <body>
                <div className="logo-footer">
                <div class="logo-footer">
                  <img src="https://seplag.mt.gov.br/img/LOGO%20SEPLAG%20-%20BRANCO%20(T)%20VAZADO.png" alt="seplag-logo"/>
                </div>
                <div class="footer">
                  <h3>SEAPS</h3>
                  <p>Secretaria Adjunta de Patrimônio e Serviços</p>
                </div>
                <div id="root">${html}</div>
            </body>
            </html>
        `;

  res.send(fullHtml);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  console.log(`http://localhost:${process.env.PORT}/`);
});

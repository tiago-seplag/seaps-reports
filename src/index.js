import puppeteer from "puppeteer";
import express from "express";
import path from "path";
import fs from "fs";
import { renderToString } from "react-dom/server";
import { Report } from "./views/report";

const app = express();

app.use(express.static("src/public"));

app.post("/", async (req, res) => {
  const data = req.body;

  console.log(data);

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
                <script src="https://cdn.jsdelivr.net/npm/pagedjs/dist/paged.polyfill.min.js"></script>
                <style>
                  ${styles}
                </style>
            </head>
            <body>
                <div id="root">${html}</div>
            </body>
            </html>
        `;

  try {
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

    await page.setContent(fullHtml, { waitUntil: "networkidle0" });

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

    res.setHeader("Content-Type", "application/pdf");

    res.send(pdfBuffer);
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    res.status(500).send("Erro ao gerar PDF.");
  }
});

app.get("/view", async (req, res) => {
  const cssPath = path.resolve("src/public/styles.css");
  const html = renderToString(<Report />);
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
                <div id="root">${html}</div>
            </body>
            </html>
        `;

  res.send(fullHtml);
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
  console.log("http://localhost:8080/");
});

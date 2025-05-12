import puppeteer from "puppeteer";
import express from "express";
import { renderToString } from "react-dom/server";
const { Report } = require("./views/report.jsx");

const app = express();

app.use(express.static("src/public"));

app.get("/", async (req, res) => {
  const html = renderToString(<Report title={"TITULO"} content={"CONTENT"} />);
  const fullHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>React SSR</title>
                <link href="tailwind.css" rel="stylesheet">
                <link href="paged.css" rel="stylesheet">
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link
                  href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                  rel="stylesheet"/>
                <script src="https://cdn.jsdelivr.net/npm/pagedjs/dist/paged.polyfill.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
            </head>
            <body>
                <div id="root">${html}</div>
            </body>
            </html>
        `;

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Importante para servidores Linux e Docker
    });

    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: "domcontentloaded" });

    // await page.evaluate(async () => {
    //   if (window.PagedPolyfill) {
    //     await new Promise((resolve) => {
    //       document.addEventListener("pagedjs:rendered", resolve);
    //     });
    //   }
    // });


    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
 
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    res.status(500).send("Erro ao gerar PDF.");
  }
});

app.get("/view", async (req, res) => {
  const html = renderToString(<Report title={"TITULO"} content={"CONTENT"} />);
  const fullHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>React SSR</title>
                <link href="tailwind.css" rel="stylesheet">
                <link href="paged.css" rel="stylesheet">
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link
                  href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                  rel="stylesheet"/>
                <script src="https://cdn.jsdelivr.net/npm/pagedjs/dist/paged.polyfill.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
            </head>
            <body>
                <div id="root">${html}</div>
            </body>
            </html>
        `;

  res.send(fullHtml);
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
  console.log("http://localhost:3002/");
});

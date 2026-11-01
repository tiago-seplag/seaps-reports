import type { ReactNode } from "react";
import { Footer } from "./footer";

/** Polyfill do `@page` para ver a paginação no navegador (só no preview). */
const PAGED_JS =
  "https://cdn.jsdelivr.net/npm/pagedjs@0.4.3/dist/paged.polyfill.min.js";

export function Document({
  title,
  styles,
  preview = false,
  children,
}: {
  title: string;
  /** CSS gerado pelo Tailwind (`dist/styles.css`), inline. */
  styles: string;
  preview?: boolean;
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
        <title>{title}</title>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        {preview && <script src={PAGED_JS} />}
      </head>
      <body>
        <div id="root">
          <Footer />
          {children}
        </div>
      </body>
    </html>
  );
}

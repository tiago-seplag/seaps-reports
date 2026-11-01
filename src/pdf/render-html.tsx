import { renderToStaticMarkup } from "react-dom/server";
import { Document } from "../layout/document";
import type { ReportDefinition, ReportData } from "../reports/define-report";

/** O HTML completo de um relatório, pronto para o WeasyPrint. */
export function renderReportHtml<R extends ReportDefinition>(
  report: R,
  data: ReportData<R>,
  options: { styles: string; preview?: boolean },
): string {
  const { Component } = report;
  const markup = renderToStaticMarkup(
    <Document
      title={report.name(data)}
      styles={options.styles}
      preview={options.preview}
    >
      <Component data={data} />
    </Document>,
  );
  return `<!doctype html>${markup}`;
}

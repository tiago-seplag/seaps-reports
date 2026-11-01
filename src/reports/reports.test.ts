import { describe, expect, it } from "vitest";
import { renderReportHtml } from "../pdf/render-html";
import { reports } from ".";

describe.each(Object.entries(reports))("relatório %s", (_type, report) => {
  it("aceita o sample.json e renderiza o HTML", () => {
    const data = report.schema.parse(report.sample);
    const html = renderReportHtml(report, data, { styles: "body{}" });

    expect(html.startsWith("<!doctype html>")).toBe(true);
    expect(html).toContain(`<title>${report.name(data)}</title>`);
    expect(html).toContain("<style>body{}</style>");
  });
});

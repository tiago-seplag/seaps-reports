import { describe, expect, it } from "vitest";
import { renderReportHtml } from "../../pdf/render-html";
import { checklist } from ".";
import type { Checklist } from "./schema";

const sample = checklist.schema.parse(checklist.sample) as Checklist;
const render = (data: Checklist) =>
  renderReportHtml(checklist, data, { styles: "" });

describe("checklist", () => {
  it("nomeia o arquivo pelo sid, trocando todas as barras", () => {
    expect(checklist.name({ ...sample, sid: "0006/25/R1" })).toBe("0006-25-R1");
  });

  it("não interpreta $ no texto do usuário", () => {
    const html = render({
      ...sample,
      user: { name: "Fulano $& $' $1" },
    });
    expect(html).toContain("Fulano $&amp; $&#x27; $1");
  });

  it("mostra -- no indicador quando não há média", () => {
    const html = render({ ...sample, score: null, finished_at: null });
    expect(html).toMatch(/INDICADOR DE MANUTENÇÃO DO IMÓVEL:<\/p><div[^>]*><p>--<\/p>/);
    expect(html).not.toContain("01/01/1970");
  });

  it("monta a URL das fotos com o BUCKET_URL e pula foto sem arquivo", () => {
    const html = render({
      ...sample,
      items: [
        {
          ...sample.items[1],
          images: [
            { id: "a", image: "/x/1.jpg", observation: null },
            { id: "b", image: null, observation: null },
          ],
        },
      ],
    });
    expect(html).toContain('src="http://bucket.test/x/1.jpg?compress=true"');
    expect(html.match(/<figure/g)).toHaveLength(1);
  });

  it("recusa payload sem os campos obrigatórios", () => {
    const result = checklist.schema.safeParse({ sid: "1/25" });
    expect(result.success).toBe(false);
  });
});

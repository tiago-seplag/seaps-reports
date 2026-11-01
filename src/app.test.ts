import { execFileSync } from "node:child_process";
import type { AddressInfo } from "node:net";
import type { Server } from "node:http";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "./app";
import { env } from "./env";
import { checklist } from "./reports/checklist";

let server: Server;
let baseUrl: string;

beforeAll(async () => {
  server = createApp().listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

afterAll(() => {
  server.close();
});

const post = (path: string, body: unknown) =>
  fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

describe("rotas", () => {
  it("GET /health", async () => {
    const res = await fetch(`${baseUrl}/health`);
    expect(res.status).toBe(200);
  });

  it("404 para tipo que não existe", async () => {
    const res = await post("/reports/nao-existe", {});
    expect(res.status).toBe(404);
  });

  it("400 para payload inválido", async () => {
    const res = await post("/reports/checklist", { sid: "1/25" });
    expect(res.status).toBe(400);
    const body = (await res.json()) as { issues: unknown[] };
    expect(body.issues.length).toBeGreaterThan(0);
  });

  it("400 para JSON malformado", async () => {
    const res = await post("/reports/checklist", "{nope");
    expect(res.status).toBe(400);
  });

  it("GET /reports/:type/preview devolve o HTML do sample", async () => {
    const res = await fetch(`${baseUrl}/reports/checklist/preview`);
    expect(res.status).toBe(200);
    expect(await res.text()).toContain("CHECKLIST MANUTENÇÃO PREDIAL");
  });
});

function hasWeasyPrint() {
  try {
    execFileSync(env.PYTHON_BIN, ["-c", "import weasyprint"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

// Precisa do WeasyPrint (PYTHON_BIN=venv/bin/python no .env); senão é pulado.
describe.skipIf(!hasWeasyPrint())("PDF de verdade", () => {
  it.each(["/", "/reports/checklist"])("POST %s gera o PDF", async (path) => {
    const res = await post(path, checklist.sample);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("application/pdf");
    expect(res.headers.get("content-disposition")).toBe(
      'attachment; filename="0006-25.pdf"',
    );
    const pdf = Buffer.from(await res.arrayBuffer());
    expect(pdf.subarray(0, 5).toString()).toBe("%PDF-");
  }, 60_000);
});

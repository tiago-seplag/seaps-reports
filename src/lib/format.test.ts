import { describe, expect, it } from "vitest";
import { formatDate, formatPhone } from "./format";

describe("formatPhone", () => {
  it("formata fixo e celular", () => {
    expect(formatPhone("6536130000")).toBe("(65) 3613-0000");
    expect(formatPhone("65999998888")).toBe("(65) 9 9999-8888");
  });

  it("devolve -- quando vazio", () => {
    expect(formatPhone(null)).toBe("--");
    expect(formatPhone("")).toBe("--");
  });
});

describe("formatDate", () => {
  it("usa o fuso de Cuiabá, não o do servidor", () => {
    // 01:30 UTC do dia 15 ainda é dia 14 em Cuiabá (UTC-4).
    expect(formatDate(new Date("2025-05-15T01:30:00Z"))).toBe("14/05/2025");
  });

  it("devolve -- quando não há data", () => {
    expect(formatDate(null)).toBe("--");
  });
});

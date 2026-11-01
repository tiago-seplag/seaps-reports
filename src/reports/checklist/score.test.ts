import { describe, expect, it } from "vitest";
import { indicatorOf, itemScoreLabel } from "./score";

describe("indicatorOf", () => {
  it("usa os limites do seaps-api", () => {
    expect(indicatorOf(3)?.label).toBe("BOM");
    expect(indicatorOf(2.51)?.label).toBe("BOM");
    expect(indicatorOf(2.5)?.label).toBe("REGULAR");
    expect(indicatorOf(1.5)?.label).toBe("REGULAR");
    expect(indicatorOf(1.49)?.label).toBe("RUIM");
    expect(indicatorOf(null)).toBeNull();
  });
});

describe("itemScoreLabel", () => {
  it("traduz a nota do item", () => {
    expect(itemScoreLabel(3)).toBe("BOM");
    expect(itemScoreLabel(1)).toBe("REGULAR");
    expect(itemScoreLabel(-2)).toBe("RUIM");
    expect(itemScoreLabel(0)).toBe("N/A");
    expect(itemScoreLabel(null)).toBe("--");
  });
});

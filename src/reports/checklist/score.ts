import { Bad, Good, NA, Regular } from "../../ui/icons";

/** Notas de um item, na ordem das colunas da tabela. */
export const ITEM_SCORES = [
  { value: 3, label: "BOM", Icon: Good },
  { value: 1, label: "REGULAR", Icon: Regular },
  { value: -2, label: "RUIM", Icon: Bad },
  { value: 0, label: "N/A", Icon: NA },
] as const;

/** Rótulo da nota do item; `--` se não avaliado. */
export function itemScoreLabel(score: number | null): string {
  return ITEM_SCORES.find((s) => s.value === score)?.label ?? "--";
}

/**
 * Indicador do imóvel pela média. Os mesmos limites do `calculateScore` do
 * seaps-api (`src/modules/inspections/domain/score.ts`).
 */
export function indicatorOf(score: number | null) {
  if (score === null) return null;
  if (score > 2.5) return { label: "BOM", Icon: Good, border: "border-green-600" };
  if (score < 1.5) return { label: "RUIM", Icon: Bad, border: "border-red-600" };
  return { label: "REGULAR", Icon: Regular, border: "border-yellow-600" };
}

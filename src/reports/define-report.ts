import type { ReactNode } from "react";
import type { z } from "zod";

/**
 * Um tipo de PDF. Cada um mora na sua pasta em `src/reports/<tipo>/` e entra
 * no registro em `src/reports/index.ts`, que vira a rota
 * `POST /reports/<tipo>`.
 */
export interface ReportDefinition<S extends z.ZodType = z.ZodType> {
  /** Valida o JSON recebido; o componente recebe o resultado já tipado. */
  schema: S;
  /** Nome do arquivo (sem `.pdf`) e `<title>` do HTML. */
  name: (data: z.output<S>) => string;
  /** O conteúdo das páginas. Rodapé e CSS vêm do layout comum. */
  Component: (props: { data: z.output<S> }) => ReactNode;
  /** Payload de exemplo: usado no preview e nos testes. */
  sample: unknown;
}

export type ReportData<R extends ReportDefinition> = z.output<R["schema"]>;

export function defineReport<S extends z.ZodType>(
  report: ReportDefinition<S>,
): ReportDefinition<S> {
  return report;
}

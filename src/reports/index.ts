import type { ReportDefinition } from "./define-report";
import { checklist } from "./checklist";

/**
 * Os PDFs que o serviço sabe gerar. A chave é o `:type` da rota
 * `POST /reports/:type`. Para criar um novo, veja o README.
 */
export const reports: Record<string, ReportDefinition> = {
  checklist,
};

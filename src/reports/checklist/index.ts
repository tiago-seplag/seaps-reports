import { defineReport } from "../define-report";
import { ChecklistReport } from "./report";
import sample from "./sample.json";
import { checklistSchema } from "./schema";

/** Checklist de manutenção predial (`POST /reports/checklist` e `POST /`). */
export const checklist = defineReport({
  schema: checklistSchema,
  name: (data) => data.sid.replaceAll("/", "-"),
  Component: ChecklistReport,
  sample,
});

import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(8080),
  /** Prefixo das fotos: a API manda só o caminho dentro do bucket. */
  BUCKET_URL: z.string().min(1),
  /** Python com o WeasyPrint instalado (no dev, `venv/bin/python`). */
  PYTHON_BIN: z.string().min(1).default("python3"),
  PDF_TIMEOUT_MS: z.coerce.number().int().positive().default(60_000),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  console.error(`Variáveis de ambiente inválidas:\n${z.prettifyError(parsed.error)}`);
  process.exit(1);
}

export const env = parsed.data;
export const isProduction = env.NODE_ENV === "production";

import morgan from "morgan";
import { env } from "../env";
import { logger } from "./logger";

/** Log de cada request, só no desenvolvimento. */
export const httpLogger = morgan(
  ":remote-addr :method :url :status :res[content-length] - :response-time ms",
  {
    stream: { write: (message) => logger.http(message.trim()) },
    skip: () => env.NODE_ENV !== "development",
  },
);

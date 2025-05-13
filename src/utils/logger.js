import {
  addColors,
  format as _format,
  transports as _transports,
  createLogger,
} from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

addColors(colors);

const format = _format.combine(
  _format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  _format.colorize({ all: true }),
  _format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const transports = [
  new _transports.Console(),
  new _transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  new _transports.File({ filename: "logs/all.log" }),
];

const logger = createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default logger;

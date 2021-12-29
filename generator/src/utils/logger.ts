import * as winston from "winston"; // Logging

// Setup winston logger
export const logger = winston.createLogger({
  level: "info",
  // Simple line-by-line output
  format: winston.format.simple(),
  transports: [
    // Print to console
    new winston.transports.Console(),
    // + Output to generator logfile
    new winston.transports.File({ filename: "generator.log" })
  ]
});

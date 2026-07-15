import type { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";

const logsDirectory = path.join(process.cwd(), "logs");
const logFilePath = path.join(logsDirectory, "logger.txt");

const logger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    res.on("finish", () => {
        const now = new Date();

        const formattedTime = new Intl.DateTimeFormat("en-GB", {
            weekday: "long",
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        }).format(now);

        const duration = Date.now() - start;
        const status = res.statusCode;

        const logMessage =
            `Method: ${req.method} | ` +
            `URL: ${req.originalUrl} | ` +
            `Status: ${status} | ` +
            `Duration: ${duration}ms | ` +
            `Time: ${formattedTime}\n`;

        console.log(logMessage.trim());

        // Create logs directory if it doesn't exist
        fs.mkdir(logsDirectory, { recursive: true }, (mkdirError) => {
            if (mkdirError) {
                console.error("Failed to create logs directory:", mkdirError);
                return;
            }

            // Append log message to log file
            fs.appendFile(logFilePath, logMessage, "utf8", (error) => {
                if (error) {
                    console.error("Failed to write log:", error);
                }
            });
        });
    });

    next();
};

export default logger;
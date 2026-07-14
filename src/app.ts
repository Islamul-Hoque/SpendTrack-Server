import express, { type Application, type Request, type Response } from "express";
import CookieParser from "cookie-parser";
import cors from "cors";

const app: Application = express();

// Built-in middleware: JSON, text, and URL-encoded body parsing
app.use(CookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
        maxAge: 600,
    }),
);


// Root route handler (GET)
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        "status": true,
        "message": "SpendTrack API is live and ready to handle requests",
        "version": "1.0.0",
        "author": "Islamul Hoque",
        "timestamp": "Tuesday, 23 Jun 2026, 9:07 AM BST",
        "environment": "development",
        "uptime": "15234ms",
        "server": "Express.js & TypeScript",
        "docs": "/api/docs",
        "health": "healthy"
    })
})


export default app;
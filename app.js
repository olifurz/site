import express from "express";
import rateLimit from "express-rate-limit";
import mysql from "mysql2/promise";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "dist")));

const visitLimiter = rateLimit({
    windowMs: 60 * 1000, // 60 seconds
    max: 5, // 5 requests per minute
    message: { error: "too many requests" },
    standardHeaders: true,
    legacyHeaders: false,
});

const db = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "myuser",
    password: process.env.DB_PASSWORD || "mypassword",
    database: process.env.DB_NAME || "sitedb",
});

app.post("/api/visit", visitLimiter, async (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const ua = req.headers["user-agent"] || "";
    const hash = crypto.createHash("sha256").update(ip + ua).digest("hex");

    await db.query("INSERT INTO visits (ip, ua) VALUES (?, ?)", [ip, ua]);

    let isNew = false;
    try {
        await db.query("INSERT INTO uniquevisits (ip_hash) VALUES (?)", [hash]);
        isNew = true;
    } catch {
        // already exists
    }

    res.json({ ok: true, new: isNew });
});

app.get("/api/visits", async (req, res) => {
    const [rows] = await db.query("SELECT COUNT(*) AS total FROM visits");
    res.json({ total: rows[0].total });
});

app.get("/api/uniquevisits", async (req, res) => {
    const [rows] = await db.query("SELECT COUNT(*) AS total FROM uniquevisits");
    res.json({ total: rows[0].total });
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "dist", "404.html"));
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
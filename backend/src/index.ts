import express from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
var accessLogStream = fs.createWriteStream(
  path.join(__dirname, "../logs/access.log"),
  {
    flags: "a",
  }
);

// Database configuration
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: "postgres",
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms", {
    stream: accessLogStream,
  })
);

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client?.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log("Connected to Database teste");
  });
});

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something broke!" });
  }
);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { app, pool };

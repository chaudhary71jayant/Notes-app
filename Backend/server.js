import express from "express";
import dotenv from "dotenv";
import connectDb from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import noteRoutes from "./src/routes/notes.routes.js";
dotenv.config();

connectDb();

const app = express();
const PORT = Number(process.env.PORT) || 8080;
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use((req, res, next) => {
  const requestOrigin = req.headers.origin;

  if (!requestOrigin) {
    return next();
  }

  if (allowedOrigins.includes(requestOrigin)) {
    res.setHeader("Access-Control-Allow-Origin", requestOrigin);
    res.setHeader("Vary", "Origin");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }

    return next();
  }

  return res.status(403).json({
    success: false,
    message: "CORS blocked for this origin",
  });
});
app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/notes",noteRoutes);


//moddleware
app.use((err,req,res,next) => {
    console.error("Error stack : ", err.stack);

    res.status(err.status || 500).json({
        success : false,
        message : err.message || "Internal server Error",
    });
})

app.get("/", (req,res) => {
    res.send("The app demo is created");
});

app.listen(PORT, () => {
    console.log(`The server is running at ${PORT}`);
});


import express from "express";
import dotenv from "dotenv";
import connectDb from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js"
import userRoutes from "./src/routes/user.routes.js"
dotenv.config();

connectDb();

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth",authRoutes);

app.get("/", (req,res) => {
    res.send("The app demo is created");
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`The server is running at ${process.env.PORT} `);
});


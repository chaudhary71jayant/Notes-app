import express from "express";
import dotenv from "dotenv";
import connectDb from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import noteRoutes from "./src/routes/notes.routes.js";
dotenv.config();

connectDb();

const app = express();

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

app.listen(process.env.PORT || 8080, () => {
    console.log(`The server is running at ${process.env.PORT} `);
});


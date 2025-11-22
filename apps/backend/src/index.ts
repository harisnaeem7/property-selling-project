import express from "express";
import cors from "cors";
import dotenv from "dotenv";
const connectDB = require("./db");
import authRouter from "./routes/authRoutes";
import authUserRouter from "./controllers/protectedRouteController";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Backend is running now  ");
});

app.use("/auth", authRouter);
app.use("/user", authUserRouter);

const PORT = process.env.PORT || 5009;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

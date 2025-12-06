import express from "express";
import cors from "cors";
import dotenv from "dotenv";
const connectDB = require("./db");
import authRouter from "./routes/authRoutes";
import { verifyToken } from "./middleware/protectedroutes";
import userRoutes from "./routes/userRoutes";
import dashboardRoute from "./routes/dashboard";

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Backend is running now  ");
});

//app.use("/user", authRouter);

app.use("/auth", authRouter);
app.use("/user", userRoutes);
app.use("/", dashboardRoute);

const PORT = process.env.PORT || 5009;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

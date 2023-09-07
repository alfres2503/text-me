import cors from "cors";
import dotEnv from "dotenv";
import express from "express";
import AuthRouter from "./routes/auth.routes";
import MessageRouter from "./routes/message.routes";

const app = express();

dotEnv.config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", AuthRouter);
app.use("/api/message", MessageRouter);

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

global.onlineUsers = new Map();

import cors from "cors";
import dotEnv from "dotenv";
import express from "express";
import { Server } from "socket.io";
import AuthRouter from "./routes/auth.routes";
import MessageRouter from "./routes/message.routes";

const app = express();

dotEnv.config();

app.use(cors());
app.use(express.json());

app.use("/uploads/images/", express.static("uploads/images"));

app.use("/api/auth", AuthRouter);
app.use("/api/message", MessageRouter);

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

// Socket IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    global.onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = global.onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", {
        from: data.from,
        message: data.message,
      });
    }
  });
});

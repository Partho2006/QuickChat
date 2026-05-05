import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./route/userRoutes.js";
import messageRouter from "./route/messageRoutes.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
    cors: { origin: "*" }
});

export const userSocketMap = {};

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (!userId) {
        console.log("Connection attempt without userId, disconnecting.");
        socket.disconnect();
        return;
    }

    // ✅ If this user already has an old socket, disconnect it cleanly first
    const existingSocketId = userSocketMap[userId];
    if (existingSocketId && existingSocketId !== socket.id) {
        const existingSocket = io.sockets.sockets.get(existingSocketId);
        if (existingSocket) {
            existingSocket.disconnect(true); // force disconnect old socket
        }
    }

    // ✅ Register the new socket
    userSocketMap[userId] = socket.id;
    console.log("User Connected", userId, "| Socket:", socket.id);

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User Disconnected", userId, "| Socket:", socket.id);

        // ✅ Only delete if this socket is still the registered one
        // Prevents a newer connection from being wiped by an old socket's disconnect
        if (userSocketMap[userId] === socket.id) {
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }
    });
});

app.use(express.json({ limit: "4mb" }));
app.use(cors());

app.use('/api/status', (req, res) => res.send('Server is live'));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server is running on PORT: " + PORT));
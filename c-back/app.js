import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors"; // Import the cors middleware
import { initializeGame } from "./game-logic.js";

const app = express();
const server = createServer(app);
const io = new Server(server);

// Use the cors middleware
app.use(cors());

// Express app routes go here

// Socket.IO logic
io.on("connection", (socket) => {
  initializeGame(io, socket);
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow sending cookies
  })
);

import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { dislike } from "./dislike";
import { like } from "./like";
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket: Socket) => {
  socket.on("like add", async (data, session) => {
    const { likeData, dislikeData } = await like(data, session);
    io.emit("like added", likeData, dislikeData);
  });
  socket.on("dislike add", async (data, session) => {
    const { dislikeData, likeData } = await dislike(data, session);
    io.emit("dislike added", dislikeData, likeData);
  });
});

httpServer.listen(3001, () => {
  console.log("listening on *:3001");
});

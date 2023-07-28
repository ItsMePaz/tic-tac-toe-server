/* import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
import http from "http";
import { Server } from "socket.io";

const app: Application = express();

const server = http.createServer(app);

const io = new Server(server);
app.use(express.static(path.resolve("")));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello");
});

app.listen(5500, () => console.log("Server Running"));
 */

"use strict";
/* const express = require("express");
const app = express();

const path = require("path");
const http = require("http");
const Server = require("socket.io");

const server = http.createServer(app);

const io = new Server(server);
app.use(express.static(path.resolve("")));

app.get("/", (req: Request, res: Response) => {
  return console.log("Hello");
});

server.listen(3200, () => {
  console.log("port connected to 3200");
});
 */
const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methodsL: ["GET", "POST"],
    },
});
let nameArray = [];
let playingArray = [];
let playerCombArray = [];
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    /*  socket.on("send_message", (data: any) => {
      socket.broadcast.emit("receive_message", data);
    }); */
    socket.on("send_name", (e) => {
        let name = e.name;
        let value1 = e.button1;
        playerCombArray.push(value1);
        nameArray.push(name);
        if (nameArray.length >= 2) {
            let player1 = {
                player1Name: nameArray[0],
                player1Value: "X",
                player1Move: "",
            };
            let player2 = {
                player2Name: nameArray[1],
                player2Value: "O",
                player2Move: "",
            };
            let obj = {
                p1: player1,
                p2: player2,
            };
            playingArray.push(obj);
            console.log(playingArray);
            console.log(nameArray);
            if (nameArray.length > 2) {
                nameArray.splice(0, 2);
            }
            io.emit("send_name", { allPlayers: playingArray, nameArray });
        }
        console.log(nameArray);
        console.log(playingArray);
        console.log(playerCombArray);
    });
});
server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});

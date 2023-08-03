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
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    /*  socket.on("send_message", (data: any) => {
      socket.broadcast.emit("receive_message", data);
    }); */
    socket.on("send_name", (e) => {
        let name = e.name;
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
    });
    socket.on("button1", (e) => {
        let buttonObj = { b1: e.button1, b1Status: e.button1State };
        console.log(buttonObj);
        io.emit("button1", { buttonObj });
    });
    socket.on("button2", (e) => {
        let buttonObj = { b2: e.button2, b2Status: e.button2State };
        io.emit("button2", { buttonObj });
    });
    socket.on("button3", (e) => {
        let buttonObj = { b3: e.button3, b3Status: e.button3State };
        io.emit("button3", { buttonObj });
    });
    socket.on("button4", (e) => {
        let buttonObj = { b4: e.button4, b4Status: e.button4State };
        io.emit("button4", { buttonObj });
    });
    socket.on("button5", (e) => {
        let buttonObj = { b5: e.button5, b5Status: e.button5State };
        io.emit("button5", { buttonObj });
    });
    socket.on("button6", (e) => {
        let buttonObj = { b6: e.button6, b6Status: e.button6State };
        io.emit("button6", { buttonObj });
    });
    socket.on("button7", (e) => {
        let buttonObj = { b7: e.button7, b7Status: e.button7State };
        io.emit("button7", { buttonObj });
    });
    socket.on("button8", (e) => {
        let buttonObj = { b8: e.button8, b8Status: e.button8State };
        io.emit("button8", { buttonObj });
    });
    socket.on("button9", (e) => {
        let buttonObj = { b9: e.button9, b9Status: e.button9State };
        io.emit("button9", { buttonObj });
    });
});
server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});

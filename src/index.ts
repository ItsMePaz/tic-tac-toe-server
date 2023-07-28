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
let nameArray: string[] = [];
let playingArray: object[] = [];

io.on("connection", (socket: any) => {
  console.log(`User Connected: ${socket.id}`);
  /*  socket.on("send_message", (data: any) => {
    socket.broadcast.emit("receive_message", data);
  }); */

  socket.on("send_name", (e: any) => {
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

  socket.on("values", (e: any) => {
    let buttonObj = {
      b1: e.button1,
      b2: e.button2,
      b3: e.button3,
      b4: e.button4,
      b5: e.button5,
      b6: e.button6,
      b7: e.button7,
      b8: e.button8,
      b9: e.button9,
      b1Status: e.button1State,
      b2Status: e.button2State,
      b3Status: e.button3State,
      b4Status: e.button4State,
      b5Status: e.button5State,
      b6Status: e.button6State,
      b7Status: e.button7State,
      b8Status: e.button8State,
      b9Status: e.button9State,
    };

    io.emit("values", { buttonObj });
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});

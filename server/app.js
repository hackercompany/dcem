const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());

app.use("/dcem", express.static(path.join(__dirname, "dcem")));

function makeid(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

console.log(makeid(5));

function binarr(size) {
  a = "";
  for (let i = 0; i < size; i++) {
    a += Math.round(Math.random() - 0.4);
  }
  return a;
}
app.get("/", (req, res) => {
  res.send("Working");
});
app.get("/home/", (req, res) => {
  r = 3 + Math.random() / 2;
  v = Math.round((5 + Math.random() * 20) * 10) / 10;

  console.log("Got request");
  res.send({
    Location: "LLLLL",
    "Device ID": makeid(4),
    Voltage: v,
    Current: v / r,
    Alarm: binarr(9),
    Gateway: "GGGGGGGGGGGGGGGGG",
    Temperature: Math.round((20 + Math.random() * 20) * 100) / 100,
    Code: "00"
  });
});
app.get("/single-monitor/", (req, res) => {
  r = 3 + Math.random() / 2;
  v = Math.round((5 + Math.random() * 20) * 10) / 10;
  res.send({
    Location: "LLLLL",
    "Device ID": "DDDDDDDDDDDDDDDDD",
    Voltage: v,
    Current: v / r,
    Alarm: binarr(9),
    Gateway: "GGGGGGGGGGGGGGGGG",
    Temperature: Math.round((20 + Math.random() * 20) * 100) / 100,
    Code: "00"
  });
});

app.use(function(req, res) {
  return res.status(404).redirect("/dcem/");
});

port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`base URL\t\t: http://localhost:${port}/`);
  console.log(`Front-end URL\t\t: http://localhost:${port}/dcem/`);
  console.log(`Home URL \t\t: http://localhost:${port}/home/`);
  console.log(`Single Monitor URL\t: http://localhost:${port}/single-monitor/`);
});

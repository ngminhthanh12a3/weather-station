#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require("../app");
var debug = require("debug")("api-server:server");
var http = require("http");
const fs = require("fs");
const path = require("path");

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3001");
app.set("port", port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: [
      process.env.CLIENT_URL || "http://localhost:3000",
      "http://vnptiot.duckdns.org:3003",
      "https://vnptiot.duckdns.org:3003",
      ,"http://vnptiot.duckdns.org","https://vnptiot.duckdns.org","http://localhost:4003"
    ],
    credentials: true,
  },
});
exports.io = io;

const compeleteInitializeProcess = require("./compeleteInitializeProcess");
const { binOTAPath } = require("../constants");
compeleteInitializeProcess();
// // connect to mongodb
// var { connectToMongo } = require("./mongoDB");
// connectToMongo();

// var connectSocketClient = require("./connectSocketClient");
// connectSocketClient();

// const {
//   loadDeviceInfoFromDB,
//   loadOTAFieldsFromDB,
//   loadDeviceInfoAnalysis,
// } = require("../handler");
// const { DeviceInfo, OTA_Field, DeviceInfoAnalysis } = require("../models");
// const {
//   chacha20DecryptValue,
//   OTA_current_fields,
//   deviceInfoAnalysis,
// } = require("../constants");
// loadDeviceInfoFromDB(DeviceInfo, chacha20DecryptValue, "DeviceInfo");
// loadOTAFieldsFromDB(OTA_Field, OTA_current_fields, "OTAFields");
// loadDeviceInfoAnalysis(
//   DeviceInfoAnalysis,
//   deviceInfoAnalysis,
//   "DeviceInfoAnalysis"
// );

// // listen to mqtt
// var { listenToMQTT } = require("./listenToMQTT");
// listenToMQTT();

/**
 * Listen on provided port, on all network interfaces.
 */

// const FILE_BUFFER = fs.readFileSync(
//   path.join(binOTAPath, "STM32-Local-v1.2-1662972090699.bin"),
//   "binary"
// );
// // console.log(FILE_BUFFER);
// console.log("BUFFER = ")
// for (let i = 0; i < FILE_BUFFER.length; i++) {
//   console.log("0x" + FILE_BUFFER.charCodeAt(i).toString(16));
// }
// console.log(FILE_BUFFER.length)

server.listen(port, () => console.log(`Server listening on port ${port}`));
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

// io.

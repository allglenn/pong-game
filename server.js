const http = require("http");
const io = require("socket.io");

const apiServer = require("./api");
const httpServer = http.createServer(apiServer);
const socketServer = io(httpServer);


const PORT =  3000 ;
const sockets = require("./sockets");

httpServer.listen(PORT);
         
sockets.listen(socketServer)

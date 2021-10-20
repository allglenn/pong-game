
let readyPlayerCount = 0;
function listen(io){
    const pongNamespace = io.of("/");

    pongNamespace.on("connection", (socket) => {
        let room;
        console.log("test")
        socket.on("ready", () => {
             room  = "room" + Math.floor(readyPlayerCount/2)
             socket.join(room);
             readyPlayerCount = readyPlayerCount + 1;  
            if (readyPlayerCount%2 === 0) {
                console.log("two people");
                pongNamespace.in(room).emit("startGame", socket.id);
            }
        })

        socket.on("paddleMove", (paddleData) => {
            socket.to(room).emit("paddleMove", paddleData);
        })

        socket.on("ballMove", (ballData) => {
            socket.to(room).emit("ballMove", ballData);
        })

        socket.on("disconnect", (reason) => {
            console.log("user disconnected", socket.id, reason);
            socket.leave(room);
        })
    })
};
module.exports ={
    listen,
}

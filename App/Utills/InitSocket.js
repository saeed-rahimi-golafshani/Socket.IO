const socketIo = require("socket.io");

function initialSocket(httpServer){
    const io = socketIo(httpServer, {
        cores: {
            origin: "*"
        }
    })
    return io;
};

module.exports = {
    initialSocket
}
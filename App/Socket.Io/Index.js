const NameSpaceSocketHandler = require("./NameSpace.Socket")


module.exports = {
    socketHandler: (io) => {
        new NameSpaceSocketHandler(io).initConnection()
    }
}
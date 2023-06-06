const { ConversationModel } = require("../Models/Conversation.Model")

module.exports = class NameSpaceSocketHandler{
    #io;
    constructor(io){
        this.#io = io;
    }
    initConnection(){
        this.#io.on("connection", async (socket) =>{
            const namespaces = await ConversationModel.find({}, {title: 1, endpoint: 1, rooms: 1}).sort({_id: -1});
            socket.emit("namespacesList", namespaces);
        })
    }
    async createNamespaceConnection(){
        const namespaces = await ConversationModel.find({}, {title: 1, endpoint: 1, rooms: 1});
        for (const namespace of namespaces){
            this.#io.of(`/${namespace.endpoint}`).on("connetion", (socket) =>{
                socket.emit("roomList", namespace.rooms)
            })
        }
    }
}
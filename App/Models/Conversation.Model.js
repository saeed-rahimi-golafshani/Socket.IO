const { default: mongoose } = require("mongoose");

const MessageSchema = new mongoose.Schema({
    sender: {type: mongoose.Types.ObjectId, ref: "user"},
    message: {type: String},
    datatime: {type: String}

})
const RoomSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    image: {type: String},
    message: {type: [MessageSchema], default: []}
})
const ConversationSchema = new mongoose.Schema({
    title: {type: String, required: true},
    endpoint: {type: String, required: true},
    rooms: {type: [RoomSchema], default: []}
})

module.exports = {
    ConversationModel: mongoose.model("conversation", ConversationSchema)
}
const createHttpError = require("http-errors");
const { ConversationModel } = require("../../../Models/Conversation.Model");
const Controller = require("./../Controller");
const path =require("path");
const { StatusCodes: httpStatus } = require("http-status-codes") 

class RoomController extends Controller{
    async addRoom(req, res, next){
        try {
            const { name, description, fileUploadPath, filename, namespace } = req.body;
            await this.findConversationWithEndpiont(namespace);
            await this.findRommWithName(name);
            const image = (path.join(fileUploadPath, filename)).replace(/\\/g, "/")
            const room = {name, description, image};
            const conversation = await ConversationModel.updateOne({endpoint: namespace}, {
                $push: {rooms: room}
            });
            if(conversation.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری")
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "روم با موفقیت ثبت شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async listOfRoom(req, res, next){
        try {
            const conversation = await ConversationModel.find({}, {rooms: 1});
            if(!conversation) throw new createHttpError.NotFound("روم یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    Rooms: conversation.rooms
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async findRommWithName(name){
        const room = await ConversationModel.findOne({"rooms.name": name});
        if(room) throw new createHttpError.BadRequest("این نام از قبل ثبت شده است");
    }
    async findConversationWithEndpiont(endpoint){
        const conversatin = await ConversationModel.findOne({endpoint});
        if(!conversatin) throw new createHttpError.NotFound("فضای مکالمه ای یافت نشد");
        return conversatin
    }
}

module.exports = {
    RoomController: new RoomController()
}
                            
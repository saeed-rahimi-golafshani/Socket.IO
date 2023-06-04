const createHttpError = require("http-errors");
const { ConversationModel } = require("../../../Models/Conversation.Model");
const Controller = require("./../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes")

class NameSpaceController extends Controller{
    async addNameSapce(req, res, next){
        try {
            const { title, endpoint } = req.body;
            await this.findNamespaceWithEndpoint(endpoint);
            const conversation = await ConversationModel.create({title, endpoint});
            if(!conversation) throw new createHttpError.InternalServerError("خطای سروری")
            return res.status(httpStatus.CREATED).json({
            statusCode: httpStatus.CREATED,
            data: {
                message: "فضای نام برای مکالمه ایجاد شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async listOfNamespace(req, res, next){
        try {
            const namespace = await ConversationModel.find({}, {rooms: 0});
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    namespace
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async findNamespaceWithEndpoint(endpoint){
        const conversation = await ConversationModel.findOne({endpoint});
        if(conversation) throw createHttpError.BadRequest("این نام قبلا انتخاب شده است");
    }
}

module.exports = {
    NameSpaceController: new NameSpaceController()
}
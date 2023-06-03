const { render } = require("ejs");
const Controller = require("../Controller");

class SupportController extends Controller{
    renderChatRoom(req, res, next){
        try {
            return res.render("Chat.ejs");
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    SupportController: new SupportController()
}
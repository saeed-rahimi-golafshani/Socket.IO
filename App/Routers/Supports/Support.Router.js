const { SupportController } = require("../../Http/Controller/Support/Support.Controller");
const router = require("express").Router();

router.get("/", SupportController.renderChatRoom)

module.exports = {
    SupportSectionRouter: router
};
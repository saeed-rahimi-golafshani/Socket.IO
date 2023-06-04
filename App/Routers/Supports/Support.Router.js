const { SupportController } = require("../../Http/Controller/Support/Support.Controller");
const { NamespaceRoutes } = require("./NameSpace.Router");
const { RoomRoutes } = require("./Room.Router");
const router = require("express").Router();

// router.use("/", SupportController.renderChatRoom)
router.use("/namespace", NamespaceRoutes);
router.use("/room", RoomRoutes)

module.exports = {
    SupportSectionRouter: router
};
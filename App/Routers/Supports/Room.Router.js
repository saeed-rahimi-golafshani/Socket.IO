const { RoomController } = require("../../Http/Controller/Support/Room.Controller");
const { uploadFile } = require("./../../Utills/Multer")
const router = require("express").Router();

router.post("/add", uploadFile.single("image"), RoomController.addRoom);
router.get("/list", RoomController.listOfRoom)

module.exports = {
    RoomRoutes: router
}
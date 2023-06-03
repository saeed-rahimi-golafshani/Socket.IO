const router = require("express").Router();
const { HomeController } = require("../../Http/Controller/Api/Home.Controller")

    router.get("/", HomeController.indexPage)

module.exports = {
    HomeRoutes: router
}
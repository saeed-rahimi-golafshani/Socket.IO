const redisClient = require("../Utills/Init.Redis");
const { HomeRoutes } = require("./Api/Home.Routes");
const { SupportSectionRouter } = require("./Supports/Support.Router");
const router = require("express").Router();
(async() =>{
    await redisClient.set("key", "value")
    const value = await redisClient.get("key");
    console.log(value);
})();

    router.use("/", HomeRoutes)
    router.use("/support", SupportSectionRouter)

module.exports = {
    AllRoutes: router
}
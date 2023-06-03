const redisClient = require("../Utills/Init.Redis");
const { HomeRoutes } = require("./Api/Home.Routes");
const router = require("express").Router();
(async() =>{
    await redisClient.set("key", "value")
    const value = await redisClient.get("key");
    console.log(value);
})();

    router.use("/", HomeRoutes)

module.exports = {
    AllRoutes: router
}
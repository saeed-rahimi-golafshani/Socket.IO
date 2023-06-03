require("dotenv").config();
const Application = require("./App/server");
const port = process.env.APPLICATION_PORT;
const mongoUrl = process.env.MONGODB_URL;
new Application(port, mongoUrl) 
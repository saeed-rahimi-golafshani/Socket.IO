const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const { default: mongoose } = require("mongoose");
const http = require("http");
const createHttpError = require("http-errors");
const { AllRoutes } = require("./Routers/Router");
const ejs = require("ejs");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const expressEjsLayouts = require("express-ejs-layouts");

module.exports = class Application{
    #app = express();
    #PORT;
    #DB_URL;
    constructor(port, dbUrl){
        this.#PORT = port;
        this.#DB_URL = dbUrl;
        this.configApplication();
        this.initRedis();
        this.initTemplateEngin();
        this.connectToMongoDb();
        this.configserver();
        this.createRoutes();
        this.errorHandller();  
    }
    configApplication(){
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended: true}));
        this.#app.use(express.static(path.join(__dirname, "..", "Public")));
        this.#app.use(cors());
        this.#app.use(morgan("dev"));
        this.#app.use(
            "/api-doc",
            swaggerUI.serve,
            swaggerUI.setup(
              swaggerJsDoc({
                swaggerDefinition: {
                  openapi: "3.0.0",
                  info: {
                    title: "SocketIo ChatBot",
                    version: "2.0.0",
                    description:
                      "چت باکس",
                    contact: {
                      name: "saeed rahimi",
                      email: "saeedrahimigolafshani@gmail.com",
                    },
                  },
                  servers: [
                    {
                      url: "http://localhost:3030",
                    },
                  ],
                  components : {
                    securitySchemes : {
                      BearerAuth : {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT",
                        
                      }
                    }
                  },
                  security : [{BearerAuth : [] }]
                },
                apis: ["./App/Routers/**/*.js"],
              }),
              {explorer: true},
            )
          );
    }
    initRedis(){
        require("./Utills/Init.Redis")
    }
    initTemplateEngin(){
        this.#app.use(expressEjsLayouts);
        this.#app.set("view engine", "ejs");
        this.#app.set("views", "Resource/Views");
        this.#app.set("layout extractStyles", true);
        this.#app.set("layout extractScript", true);
        this.#app.set("layout", "./Layouts/Master");
        // this.#app.use((req, res, next) => {
            // this.#app.locals = clientHelper(req, res);
            // next()
        //   })
    }
    connectToMongoDb(){
        mongoose.set('strictQuery', 'false')
        mongoose.connect(this.#DB_URL, (error) => {
        if(!error) return console.log("Application is connected to mongoDb...");
        return console.log("Application is not connected to mongoDb...");
})
    }
    configserver(){
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(`server run on port http://localhost:${this.#PORT}`);
        })
    }
    createRoutes(){
        this.#app.use(AllRoutes)
    }
    errorHandller(){
        this.#app.use((req, res, next) =>{
            next(createHttpError.NotFound("آدرس صفحه مورد نظر یافت نشد"))
        })
        
        this.#app.use((error, req, res, next) => {
            const servererror = createHttpError.InternalServerError();
            const statusCode = error?.status || servererror.status ;
            const message = error?.message || servererror.message
            return res.status(statusCode).send({
                errors : {
                    statusCode,
                    message
                }
            })
        })
    }
    
    }
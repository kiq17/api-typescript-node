import express from "express";
import "./services/translateYup";
import homeRoute from "./routes/homeRoute";
import loginRoute from "./routes/loginRoute";
class App {
    public server: express.Application;

    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(express.json());
    }

    routes() {
        this.server.use(homeRoute);
        this.server.use(loginRoute);
    }
}

export default new App().server;
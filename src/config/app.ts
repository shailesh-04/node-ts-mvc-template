import express, { Response, Request } from "express";
import database from "./database";
import router from "@routes/_index";
import path from "path";
class App {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.middleware();
        this.config();
        this.router();
    }
    private config(): void {
        database.testConnection();
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, '../views/'));
    }
    private middleware(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(__dirname, "../../public")));
    }
    private router(): void {
        this.app.use("/api",router);
    }
}
export default new App().app;
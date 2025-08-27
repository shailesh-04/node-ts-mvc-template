import express, { Response, Request } from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from "path";
import IndexRoutes from "#routes/index.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
class Server {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.middleware();
        this.config();
        this.router();
    }
    private config(): void {
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, '../views/'));
    }
    private middleware(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(__dirname, "../../public")));
    }
    private router(): void {
        this.app.use("/api", new IndexRoutes().router);
    }
    public async startServer(port: any): Promise<void> {
        this.app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    }
}
export default Server;
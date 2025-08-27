import { Router } from "express";
import UserController from "#controllers/users.js";
class IndexRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.userRouter();
    }
    private userRouter(): void {
        const controller = new UserController();
        this.router.get("/", (req, res) => controller.getAllUsers(req, res))
    }
}

export default IndexRoutes;
import UserModel from "#models/users.js";
import { Request, Response } from "express";
class UserController {
    public userModel: UserModel;
    constructor() {
        this.userModel = new UserModel();
    }
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await this.userModel.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to get users" });
        }
    }
}
    
export default UserController;
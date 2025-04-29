import demoModel from "@models/demo";
import { Request, Response } from "express";
class DemoController {
    //POST api/demo
    static async create(req: Request, res: Response) {
        try {
            const { demo } = req.body;
            const result: any = await demoModel.create({ demo });
            res.status(201).json({
                message: "Successfully created new Record!",
                data: {
                    id: result.insertId,
                    demo
                }
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to create new record!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    // GET api/demo
    static async read(req: Request, res: Response) {
        try {
            const result = await demoModel.read();
            res.status(200).json({demo:result});
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch data!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //GET api/demo/:id
    static async readOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await demoModel.readOne(id);
            if (!result) {
                return res.status(404).json({ message: "No avalable any record this ID!" });
            }
            res.status(200).json({demo:result});
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch fetch data!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    // PUT api/demo/:id
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { demo } = req.body;
            const result: any = await demoModel.update(id, {demo });
            res.status(200).json({
                message: "Successfully Update Record!",
                demo: { id, demo}
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to update record!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //DELETE api/demo/:id
    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await demoModel.delete(id);
            res.status(200).json({
                message: "Sucessfuly Delete Record!"
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to delete record!",
                detail: error.message || error.sqlMessage
            });
        }
    }
}
export default DemoController ;
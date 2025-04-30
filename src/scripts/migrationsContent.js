export const migrationContent = (className,tableName)=> `import database from "@config/database";
import { IClass${className}, I${className} } from "@interfaces/${tableName}";
import Migration from "@services/migration";
class ${className} implements IClass${className} {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("${tableName}", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
                demo: ["VARCHAR(100)", "NOT NULL"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"]
        });
    }
    async create(body: I${className}): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(\`INSERT INTO ${tableName}(demo) VALUES (?)\`, [demo]);
        return result;
    }
    async update(id: string, body: I${className}): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(\`UPDATE ${tableName} SET demo = ? WHERE id = ?\`, [demo, id]);
        return result;
    }
    async read(): Promise<I${className}[]> {
        const rows = await database.query(\`SELECT * FROM ${tableName} ORDER BY id DESC\`);
        return rows as I${className}[];
    }
    async readOne(id: string): Promise<I${className}[]> {
        const rows = await database.query(\`SELECT * FROM ${tableName} WHERE id = ?\`, [id]);
        return rows as I${className}[];
    }
    async delete(id: string): Promise<any[]> {
        const [result] = await database.query(\`DELETE FROM ${tableName} WHERE id = ?\`, [id]);
        return result;
    }
}
const ${tableName}Migration = new ${className}();
export const migration = ${tableName}Migration.migration;
export default ${tableName}Migration;
`;

export const interfaceContent = (className)=> `import Migration from "@services/migration";
export interface I${className} {
    id?: string;
    demo: string;
    created_at?:string;
    updated_at?:string;
}
export interface IClass${className} {
    migration: Migration;
    create(body: I${className}): Promise<any[]>;
    update(id: string, body: I${className}): Promise<any[]>;
    read(): Promise<I${className}[]>;
    readOne(id: string): Promise<I${className}[]>;
    delete(id: string): Promise<any[]>;
}
`;
export const modelContent = (className,tableName,time)=> `import ${tableName}Migration from "@migrations/${tableName}_${time}";
class ${className}Model {
    create = ${tableName}Migration.create;
    read = ${tableName}Migration.read;
    readOne = ${tableName}Migration.readOne;
    update = ${tableName}Migration.update;
    delete = ${tableName}Migration.delete;
}
export default new ${className}Model();`;

export const controllerContent = (className,tableName) =>`import ${tableName}Model from "@models/${tableName}";
import { Request, Response } from "express";
class ${className}Controller {
    //POST api/${tableName}
    static async create(req: Request, res: Response) {
        try {
            const { demo } = req.body;
            const result: any = await ${tableName}Model.create({ demo });
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
    // GET api/${tableName}
    static async read(req: Request, res: Response) {
        try {
            const result = await ${tableName}Model.read();
            res.status(200).json({${tableName}:result});
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch data!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //GET api/${tableName}/:id
    static async readOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await ${tableName}Model.readOne(id);
            if (!result) {
                return res.status(404).json({ message: "No avalable any record this ID!" });
            }
            res.status(200).json({${tableName}:result});
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch fetch data!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    // PUT api/${tableName}/:id
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { demo } = req.body;
            const result: any = await ${tableName}Model.update(id, {demo });
            res.status(200).json({
                message: "Successfully Update Record!",
                ${tableName}: { id, demo}
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to update record!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //DELETE api/${tableName}/:id
    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await ${tableName}Model.delete(id);
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
export default ${className}Controller ;`;

export const routerContent = (tableName)=>`import { Router } from "express";
import ${tableName}Controller from "@controllers/${tableName}";
const ${tableName}Router = Router();
${tableName}Router.post("/",${tableName}Controller.create);
${tableName}Router.get("/", ${tableName}Controller.read);
${tableName}Router.get("/:id", ${tableName}Controller.readOne);
${tableName}Router.put("/:id",${tableName}Controller.update);
${tableName}Router.delete("/:id",${tableName}Controller.delete);
export default ${tableName}Router;`;
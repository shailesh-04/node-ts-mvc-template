import database from "@config/database";
import { IClassErrors, IErrors } from "@interfaces/errors";
import Migration from "@services/migration";
class Errors implements IClassErrors {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("errors", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
                demo: ["VARCHAR(100)", "NOT NULL"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"]
        });
    }
    async create(body: IErrors): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(`INSERT INTO errors(demo) VALUES (?)`, [demo]);
        return result;
    }
    async update(id: string, body: IErrors): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(`UPDATE errors SET demo = ? WHERE id = ?`, [demo, id]);
        return result;
    }
    async read(): Promise<IErrors[]> {
        const rows = await database.query(`SELECT * FROM errors ORDER BY id DESC`);
        return rows as IErrors[];
    }
    async readOne(id: string): Promise<IErrors[]> {
        const rows = await database.query(`SELECT * FROM errors WHERE id = ?`, [id]);
        return rows as IErrors[];
    }
    async delete(id: string): Promise<any[]> {
        const [result] = await database.query(`DELETE FROM errors WHERE id = ?`, [id]);
        return result;
    }
}
const errorsMigration = new Errors();
export const migration = errorsMigration.migration;
export default errorsMigration;

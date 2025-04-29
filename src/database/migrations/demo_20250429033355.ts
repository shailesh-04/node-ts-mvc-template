import database from "@config/database";
import { IClassDemo, IDemo } from "@interfaces/demo";
import Migration from "@services/migration";
class Demo implements IClassDemo {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("demo", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
                demo: ["VARCHAR(100)", "NOT NULL"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"]
        });
    }
    async create(body: IDemo): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(`INSERT INTO demo(demo) VALUES (?)`, [demo]);
        return result;
    }
    async update(id: string, body: IDemo): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(`UPDATE demo SET demo = ? WHERE id = ?`, [demo, id]);
        return result;
    }
    async read(): Promise<IDemo[]> {
        const rows = await database.query(`SELECT * FROM demo ORDER BY id DESC`);
        return rows as IDemo[];
    }
    async readOne(id: string): Promise<IDemo[]> {
        const rows = await database.query(`SELECT * FROM demo WHERE id = ?`, [id]);
        return rows as IDemo[];
    }
    async delete(id: string): Promise<any[]> {
        const [result] = await database.query(`DELETE FROM demo WHERE id = ?`, [id]);
        return result;
    }
}
const demoMigration = new Demo();
export const migration = demoMigration.migration;
export default demoMigration;

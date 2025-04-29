import path from "path";
import fs from "fs/promises";

(async () => {

    if (require.main === module) {
        const args = process.argv.slice(2);
        if (args.length === 0) {
            console.log("Usage: node migration.js <command> <tableName>");
            console.log("Available commands:");
            console.log("  create <tableName> - Create a new table");
            console.log("  drop <tableName> - Drop an existing table");
            console.log("  truncate <tableName> - Truncate a table");
            console.log("  exists <tableName> - Check if a table exists");
            console.log("  addColumn <tableName> <columnName> <type> - Add a column to a table");
            console.log("  dropColumn <tableName> <columnName> - Drop a column from a table");
            console.log("  rename <tableName> <newTableName> - Rename a table");
            process.exit(1);
        }
        const command = args[0];
        const tableName = args[1];
        const query = args[2];
        if (!tableName) {
            console.error("❌ Please specify a table name.");
            process.exit(1);
        }
        const migrationFolder = path.resolve(__dirname, "../database/migrations");
        const filePattern = new RegExp(`^${tableName.toLowerCase()}_\\d+\\.ts$`);
        const files = await fs.readdir(migrationFolder);
        const migrationFile = files.find(f => filePattern.test(f));
        if (!migrationFile) {
            console.error(`❌ No migration file found for table '${tableName}'`);
            process.exit(1);
        }
        const fullPath = path.join(migrationFolder, migrationFile);
        const migrationModule = await import(fullPath);
        const migration = migrationModule.default;
        try {
            switch (command) {
                case "create":
                    await migration.migration.createTable();
                    break;
                case "drop":
                    await migration.migration.dropTable();
                    break;
                case "sql":
                    try{
                        console.log(await migration.migration.sql(query));
                    }catch(error:any){
                        console.error("SQL ERROR : ",error.message);
                    }
                break;
                default:
                    console.error(`❌ Unknown command '${command}'`);
                    process.exit(1);
            }
        } catch (error: any) {
            console.error("❌ Command failed:", error.sqlMessage || error.message);
            process.exit(1);
        }
        finally{
            process.exit(1);
        }
    }
})();


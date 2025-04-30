import color from "#services/color.js";
import {
    controllerContent,
    interfaceContent,
    migrationContent,
    modelContent,
    routerContent,
} from "./migrationsContent.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const [, , arg] = process.argv;
if (!arg) {
    console.error("❌ Please provide a class name as an argument.");
    process.exit(1);
}
const __filename = fileURLToPath(import.meta.url);
const className = arg.charAt(0).toUpperCase() + arg.slice(1);
const tableName = arg.toLowerCase();
const time = new Date()
    .toISOString()
    .replace(/[-:.TZ]/g, "")
    .slice(0, 14);

const fileName = `${arg}_${time}.ts`;
const src = path.resolve(__filename, "../../");
console.log(arg, className, tableName, time);
export const pathName = [
    {
        targetDir: path.join(src, "/database/migrations"),
        filePath: path.join(src, "/database/migrations/" + fileName),
        content: migrationContent(className, tableName),
    },
    {
        targetDir: path.join(src, "/interfaces"),
        filePath: path.join(src, `/interfaces/${tableName}.ts`),
        content: interfaceContent(className),
    },
    {
        targetDir: path.join(src, "/database/models"),
        filePath: path.join(src, `/database/models/${tableName}.ts`),
        content: modelContent(className, tableName, time),
    },
    {
        targetDir: path.join(src, "/controllers"),
        filePath: path.join(src, `/controllers/${tableName}.ts`),
        content: controllerContent(className, tableName),
    },
    {
        targetDir: path.join(src, "/routes"),
        filePath: path.join(src, `/routes/${tableName}.ts`),
        content: routerContent(tableName),
    },
];

let flag = true;
try {
    for (let migrate of pathName) {
        fs.mkdirSync(migrate.targetDir, { recursive: true });
        if (fs.existsSync(migrate.filePath)) {
            flag = false;
            throw new Error(`${migrate.filePath} : path is already resolve! `);
        } else console.log("✅", migrate.filePath);
    }
} catch (error) {
    color(["🔴 Faild to compiled files and folder", "red", "bold"]);
    color([`${error.message}`, "red"]);
}
if (flag)
    try {
        color([
            "🟢 Complication is complete! Start to creating files\n",
            "green",
            "bold",
        ]);
        for (let migrate of pathName) {
            fs.writeFileSync(migrate.filePath, migrate.content);
            console.log(`✅ Migration file created: ${migrate.filePath}`);
        }
    } catch (error) {
        color(["🔴 Faild to create files", "red", "bold"]);
        color([`${error.message}`, "red"]);
    }

color(["🟢 Complete creating files and folder", "green", "bold"]);

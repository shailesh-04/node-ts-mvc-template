import fs from "fs";
import path from "path";
import { pathName } from "./createMigrationFile";

const [, , arg] = process.argv;

if (!arg) {
  console.error("❌ Please provide a class name as an argument.");
  process.exit(1);
}

// try {
//   const filePath = path.join(process.cwd(), "database", "migrations", "errors_20250429035939.ts");
//   const data = fs.readFileSync(filePath, "utf-8");
//   console.log(data);
// } catch (error:any) {
//   console.error("❌ Failed to read file:", error.message);
// }

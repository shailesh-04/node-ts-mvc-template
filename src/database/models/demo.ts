import demoMigration from "@migrations/demo_20250429033355";
class DemoModel {
    create = demoMigration.create;
    read = demoMigration.read;
    readOne = demoMigration.readOne;
    update = demoMigration.update;
    delete = demoMigration.delete;
}
export default new DemoModel();
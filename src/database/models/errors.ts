import errorsMigration from "@migrations/errors_20250429035939";
class ErrorsModel {
    create = errorsMigration.create;
    read = errorsMigration.read;
    readOne = errorsMigration.readOne;
    update = errorsMigration.update;
    delete = errorsMigration.delete;
}
export default new ErrorsModel();
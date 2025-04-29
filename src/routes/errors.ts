import { Router } from "express";
import errorsController from "@controllers/errors";
const errorsRouter = Router();
errorsRouter.post("/",errorsController.create);
errorsRouter.get("/", errorsController.read);
errorsRouter.get("/:id", errorsController.readOne);
errorsRouter.put("/:id",errorsController.update);
errorsRouter.delete("/:id",errorsController.delete);
export default errorsRouter;
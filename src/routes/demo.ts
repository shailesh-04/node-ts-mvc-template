import { Router } from "express";
import demoController from "@controllers/demo";
const demoRouter = Router();
demoRouter.post("/",demoController.create);
demoRouter.get("/", demoController.read);
demoRouter.get("/:id", demoController.readOne);
demoRouter.put("/:id",demoController.update);
demoRouter.delete("/:id",demoController.delete);
export default demoRouter;
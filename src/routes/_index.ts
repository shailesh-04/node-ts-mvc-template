import { Router } from "express";
import demoRouter from "./demo";
const router = Router();
router.use("/demo",demoRouter);
export default router;
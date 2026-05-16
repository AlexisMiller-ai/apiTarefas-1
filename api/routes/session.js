import { Router } from "express";
import { sessionController } from "../controllers";

const router = Router();

router.post("/", sessionController.login);
router.delete("/", sessionController.logout);
router.post("/refresh", sessionController.refresh);
router.get("/", sessionController.getMe);

export default router;

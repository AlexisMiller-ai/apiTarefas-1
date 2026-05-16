import { Router } from "express";
import TarefaController from "../controllers/tarefaController";

const router = Router();

router.post("/", TarefaController.criar);
router.get("/", TarefaController.listar);
router.get("/:objectId", TarefaController.buscarPorId);
router.put("/:objectId", TarefaController.atualizar);
router.delete("/:objectId", TarefaController.remover);

export default router;
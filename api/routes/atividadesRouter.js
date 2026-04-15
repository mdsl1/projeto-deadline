import * as atividadeControllers from "../controllers/atividadeControllers.js";
import express from "express";

const router = express.Router();

router.post("/", atividadeControllers.criarAtividade);

router.get("/", atividadeControllers.listarAtividades);

router.get("/:id", atividadeControllers.listarAtividadePorId);

router.patch("/:id", atividadeControllers.alterarAtividade);

router.delete("/:id", atividadeControllers.deletarAtividade);

export default router;
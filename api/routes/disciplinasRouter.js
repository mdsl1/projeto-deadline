import * as disciplinaControllers from "../controllers/disciplinaControllers.js";
import express from "express";

const router = express.Router();

router.post("/", disciplinaControllers.criarDisciplina);

router.get("/", disciplinaControllers.listarDisciplinas);

router.get("/:id", disciplinaControllers.listarDisciplinaPorId);

router.patch("/:id", disciplinaControllers.alterarDisciplina);

router.delete("/:id", disciplinaControllers.deletarDisciplina);

export default router;
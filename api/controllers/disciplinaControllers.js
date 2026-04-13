import * as disciplinaServices from "../services/disciplinaServices.js";
import { disciplinaSchemaZod, disciplinaUpdateSchemaZod } from "../validators/zodValidators.js";
import { tratarErro } from "../utils/tratarErrosRes.js";

export async function criarDisciplina(req, res) {
    try {
        const dados = disciplinaSchemaZod.parse(req.body);
        const newDisciplina = await disciplinaServices.CriarDisciplina(dados);
        return res.status(201).json(newDisciplina);
    } catch (er) {
        return tratarErro(res, er, "criar disciplina");
    }
}

export async function listarDisciplinas(req, res) {
    try {
        const disciplinas = await disciplinaServices.ListarDisciplinas();
        return res.status(200).json(disciplinas);
    } catch (er) {
        return tratarErro(res, er, "listar disciplinas");
    }
}

export async function listarDisciplinaPorId(req, res) {
    try {
        const id = req.params.id;

        const disciplina = await disciplinaServices.ListarDisciplinaPorId(id);
        return res.status(200).json(disciplina);
    } catch (er) {
        if (er.name === "CastError") {
            return res.status(400).json({ mensagem: "Parâmetro 'Id da Disciplina' inválido." });
        }
        else {
            return tratarErro(res, er, "buscar disciplina");
        }
    }
}

export async function alterarDisciplina(req, res) {
    try {
        const id = req.params.id;
        const dados = disciplinaUpdateSchemaZod.parse(req.body);
        const updateDisciplina = await disciplinaServices.AlterarDisciplina(id, dados);

        return res.status(200).json(updateDisciplina);
    } catch (er) {
        if (er.name === "CastError") {
            return res.status(400).json({ mensagem: "Parâmetro 'Id da Disciplina' inválido." });
        }
        else {
            return tratarErro(res, er, "alterar disciplina");
        }
    }
}

export async function deletarDisciplina(req, res) {
    try {
        const id = req.params.id;
        await disciplinaServices.DeletarDisciplina(id);
        
        return res.status(200).json({ mensagem: "Disciplina removida com sucesso." });
    } catch (er) {
        if (er.name === "CastError") {
            return res.status(400).json({ mensagem: "Parâmetro 'Id da Disciplina' inválido." });
        }
        else {
            return tratarErro(res, er, "excluir disciplina");
        }
    }
}
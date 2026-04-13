import * as atividadeServices from "../services/atividadeServices.js";
import { atividadeSchemaZod, atividadeUpdateSchemaZod } from "../validators/zodValidators.js";
import { tratarErro } from "../utils/tratarErrosRes.js";

// Criar
export async function criarAtividade(req, res) {
    try {

        const dados = atividadeSchemaZod.parse(req.body);
        const anexo = req.file;
        
        const newAtividade = await atividadeServices.CriarAtividade(dados, anexo);

        return res.status(201).json( newAtividade );
    }
    catch(er) {
        console.error("Erro ao criar atividade: ", er);
        return tratarErro(res, er, "criar atividade");
    }
}

// Listar todos (com filtro)
export async function listarAtividades(req, res) {
    try {
        const status = req.query.status;
        const atividades = await atividadeServices.ListarAtividades( status );
        return res.status(200).json( atividades );
    }
    catch(er) {
        console.error("Erro ao listar atividades: ", er);
        return tratarErro(res, er, "listar atividades");
    }
}

// Listar um por ID
export async function listarAtividadePorId(req, res) {
    try {
        const id = req.params.id;
        const atividade = await atividadeServices.ListarAtividadePorId( id );

        return res.status(200).json( atividade );
    }
    catch (er) {
        console.error("Erro ao listar atividade: ", er);
        if (er.name === "CastError") {
            return res.status(400).json({ mensagem: "Parâmetro 'Id da Atividade' inválido." });
        }
        else {
            return tratarErro(res, er, "listar atividade");
        }
    }
}

// Alterar
export async function alterarAtividade(req, res) {
    try {
        const id = req.params.id;
        const dados = atividadeUpdateSchemaZod.parse(req.body);
        const anexo = req.file;

        const updateAtividade = await atividadeServices.AlterarAtividade(id, dados, anexo);
        
        return res.status(200).json(updateAtividade);
    }
    catch (er) {
        console.error("Erro ao alterar atividade: ", er);
        if (er.name === "CastError") {
            return res.status(400).json({ mensagem: "Parâmetro 'Id da Atividade' inválido." });
        }
        else {
            return tratarErro(res, er, "alterar atividade");
        }
    }
}

// Deletar
export async function deletarAtividade(req, res) {
    try {
        const id = req.params.id;
        await atividadeServices.DeletarAtividade( id );
        
        return res.status(200).json({ mensagem: "Atividade excluída com sucesso." });
    }
    catch(er) {
        console.error("Erro ao excluir atividade: ", er);
        if (er.name === "CastError") {
            return res.status(400).json({ mensagem: "Parâmetro 'Id da Atividade' inválido." });
        }
        else {
            return tratarErro(res, er, "excluir atividade");
        }
    }
}
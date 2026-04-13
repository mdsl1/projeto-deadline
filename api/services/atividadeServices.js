import { Atividade } from "../models/atividadesSchema.js";
import { ListarDisciplinaPorId } from "./disciplinaServices.js";
import fs from "fs";

// Criar
export async function CriarAtividade( dados, anexo ) {
    
    const is_email = dados.forma_envio === "E-mail";
    const infosDisciplina = await ListarDisciplinaPorId( dados.id_disciplina );

    if (!infosDisciplina) throw new Error( "A disciplina informada não foi encontrada." );
    

    const valores = {
        ...dados,
        disciplina: infosDisciplina.disciplina,
        professor: {
            nome: infosDisciplina.professor.nome,
            forma_envio: infosDisciplina.professor.forma_envio,
            ...(is_email ? { email: infosDisciplina.professor.email } : { url: infosDisciplina.professor.url })
        },
        anexo: anexo ? anexo.path : null
    };

    const newAtividade = new Atividade( valores );
    return await newAtividade.save();
}

// Listar todos (com filtro)
export async function ListarAtividades( status = null ) {
    let filtro = {};
    if( status !== null && status !== undefined ) {
        filtro = { "status": status };
    }
    return await Atividade.find( filtro );
}

// Listar um por ID
export async function ListarAtividadePorId( id ) {
    const atividade = await Atividade.findById( id );

    if(!atividade) throw new Error( "Atividade não encontrada." );

    return atividade;
}

// Alterar
export async function AlterarAtividade( id, dados, anexo = null ) {
    const atividadeAntiga = await Atividade.findById( id );
    if ( !atividadeAntiga ) throw new Error( "Atividade não encontrada para alteração." );

    let dadosAtualizacao = { ...dados };

    // Se mudou a disciplina, atualiza o professor
    if ( dados.id_disciplina && dados.id_disciplina !== atividadeAntiga.id_disciplina.toString() ) {
        const infos = await ListarDisciplinaPorId( dados.id_disciplina );
        if ( !infos ) throw new Error( "Nova disciplina não encontrada." );
        
        dadosAtualizacao.disciplina = infos.disciplina;
        dadosAtualizacao.professor = {
            nome: infos.professor.nome,
            forma_envio: infos.professor.forma_envio,
            ...( infos.professor.forma_envio === "E-mail" ? { email: infos.professor.email } : { url: infos.professor.url } )
        };
    }

    // Se enviou novo anexo, apaga o antigo do disco e atualiza
    if ( anexo ) {
        if (atividadeAntiga.anexo) {
            fs.unlink(atividadeAntiga.anexo, ( er ) => er && console.error( "Erro ao deletar anexo antigo:", er ));
        }
        dadosAtualizacao.anexo = anexo.path;
    }

    return await Atividade.findByIdAndUpdate(id, { $set: dadosAtualizacao }, { new: true });
}

// Deletar
export async function DeletarAtividade( id ) {
    const atividade = await Atividade.findById(id);
    if (!atividade) throw new Error( "Atividade não encontrada para exclusão." );

    // Apaga o arquivo físico se existir
    if (atividade.anexo) {
        fs.unlink(atividade.anexo, (err) => err && console.error("Erro ao deletar arquivo:", err));
    }

    return await Atividade.findByIdAndDelete(id);
}
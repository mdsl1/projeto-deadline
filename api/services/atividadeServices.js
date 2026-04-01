import { Atividade } from "../models/atividadesSchema.js";

// Criar
export async function CriarAtividade( dados ) {
    const newAtividade = new Atividade( dados );
    return await newAtividade.save();
}

// Listar todos (com filtro)
export async function ListarAtividades( status = null ) {
    let filtro = {};
    if( status !== null && status !== undefined ) {
        filtro = { "status": status };
    }
    return await Atividade.find(filtro);
}

// Listar um por ID
export async function ListarAtividadePorId( id ) {
    return await Atividade.findById( id );
}

// Alterar
export async function AlterarAtividade( id, dados ) {
    return await Atividade.findByIdAndUpdate(
        { id: Number(id) },
        { $set: dados },
        { $new: true }
    );
}

// Deletar
export async function DeletarAtividade( id ) {
    return await Atividade.findByIdAndDelete( id );
}
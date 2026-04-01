import { Disciplina } from "../models/disciplinasSchema.js";
// Criar
export async function CriarDisciplina( dados ) {
    const newDisciplina = new Disciplina( dados );
    return await newDisciplina.save();
}

// Listar todos
export async function ListarDisciplinas() {
    return await Disciplina.find({});
}

// Listar um por ID
export async function ListarDisciplinaPorId( id ) {
    return await Disciplina.findById( id );
}

// Alterar
export async function AlterarDisciplina( id, dados ) {
    return await Disciplina.findByIdAndUpdate(
        { id: Number(id) },
        { $set: dados },
        { $new: true }
    );
}

// Deletar
export async function DeletarDisciplina( id ) {
    return await Disciplina.findByIdAndDelete( id );
}
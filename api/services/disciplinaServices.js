import { Disciplina } from "../models/disciplinasSchema.js";
// Criar
export async function CriarDisciplina( dados ) {
    const forma_envio = dados.forma_envio;

    const valores = {
        ...dados,
        professor: {
            nome: dados.professor.nome,
            // Lógica condicional: só insere se a forma de envio pedir e se o dado existir na disciplina
            ...(forma_envio === "E-mail" ? { email: dados.professor.email } : {}),
            ...(forma_envio === "Classroom" ? { url: dados.professor.url } : {})
        },
    };

    const newDisciplina = new Disciplina( valores );
    return await newDisciplina.save();
}

// Listar todos
export async function ListarDisciplinas() {
    return await Disciplina.find({});
}

// Listar um por ID
export async function ListarDisciplinaPorId( id ) {
    const disciplina = await Disciplina.findById( id );

    if(!disciplina) throw new Error ( "Disciplina não encontrada." );
    
    return disciplina;
}

// Alterar
export async function AlterarDisciplina( id, dados ) {
    const disciplinaAntiga = await Disciplina.findById(id);
    if (!disciplinaAntiga) throw new Error( "Disciplina não encontrada para alteração." );

    let valores = { ... dados };

    return await Disciplina.findByIdAndUpdate(
        id,
        { $set: valores },
        { new: true }
    );
}

// Deletar
export async function DeletarDisciplina( id ) {
    const disciplina = await Disciplina.findById(id);
    if (!disciplina) throw new Error( "Disciplina não encontrada para exclusão." );

    return await Disciplina.findByIdAndDelete( id );
}
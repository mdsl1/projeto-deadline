import { Disciplina } from "../models/disciplinasSchema.js";
// Criar
export async function CriarDisciplina( dados ) {
    const isEmail = dados.professor.forma_envio === "E-mail";

    const valores = {
        ...dados,
        professor: {
            nome: dados.professor.nome,
            forma_envio: dados.professor.forma_envio,
            ...(isEmail ? { email: dados.professor.email } : { url: dados.professor.url })
        }
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

    if (dados.professor && dados.professor.forma_envio) {
        const isEmail = dados.professor.forma_envio === "E-mail";

        valores.professor = {
            nome: dados.professor.nome || disciplinaAntiga.professor.nome,
            forma_envio: dados.professor.forma_envio,
            ...(isEmail 
                ? { email: dados.professor.email, url: undefined } 
                : { url: dados.professor.url, email: undefined })
        };
    }

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
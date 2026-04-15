import mongoose, { Schema } from "mongoose";

export const atividadeSchema = new Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    id_disciplina: { 
        type: Schema.Types.ObjectId, 
        ref: "Disciplina", // Referência para o outro Model
        required: true 
    },
    disciplina: { type: String, required: true },
    forma_envio: { 
        type: String,
        required: true,
        enum: [ "E-mail", "Presencial", "Classroom", "Outro" ]
    },
    professor: {
        nome: { type: String, required: true },
        email: { type: String },
        url: { type: String }
    },
    prazo: { type: Date, required: true },
    status: { 
        type: String,
        enum: ["No prazo", "Atrasado", "Concluido", "Entregue"],
        default: "No prazo"
    },
    anexo: { type: String },
    criado: { type: Date, default: Date.now }
});

export const Atividade = mongoose.model("Atividade", atividadeSchema, "atividades");
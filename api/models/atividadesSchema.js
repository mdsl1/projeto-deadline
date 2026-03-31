import mongoose, { Schema } from "mongoose";

export const atividadeSchema = new Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    disciplina: { type: String, required: true },
    professor: {
        nome: { type: String, required: true },
        forma_envio: { 
            type: String,
            required: true,
            enum: [ "E-mail", "Presencial", "Classroom", "Outro" ]
        },
        email: { 
            type: String, 
            required: function() { return this.professor.forma_envio === "E-mail"; } 
        },
        url: { 
            type: String, 
            required: function() { return this.professor.forma_envio === "Classroom"; } 
        }
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
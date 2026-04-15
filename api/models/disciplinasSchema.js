import mongoose, { Schema } from "mongoose";

export const disciplinaSchema = new Schema({
    disciplina: { type: String, required: true },
    professor: {
        nome: { type: String, required: true },
        email: { type: String, default: null },
        url: { type: String, default: null }
    },
    criado: { type: Date, default: Date.now }
});

export const Disciplina = mongoose.model("Disciplina", disciplinaSchema, "disciplinas");
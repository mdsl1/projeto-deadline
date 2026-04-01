import mongoose, { Schema } from "mongoose";

export const disciplinaSchema = new Schema({
    disciplina: { type: String, required: true },
    professor: {
        nome: { type: String, required: true },
        forma_envio: { 
            type: String,
            required: true,
            enum: [ "E-mail", "Classroom" ]
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
    criado: { type: Date, default: Date.now }
});

export const Disciplina = new Model("Disciplina", disciplinaSchema, "disciplinas");
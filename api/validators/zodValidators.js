import { z } from "zod";

// ATIVIDADES
export const atividadeSchemaZod = z.object({
    titulo: z.string().min(3),
    descricao: z.string().min(3),
    id_disciplina: z.string().length(24, "ID de disciplina inválido"),
    forma_envio: z.enum(["E-mail", "Presencial", "Classroom", "Outro"]),                         
    prazo: z.string().pipe(z.coerce.date()),
    status: z.enum(["No prazo", "Atrasado", "Concluido", "Entregue"]).optional()
}).strict();
export const atividadeUpdateSchemaZod = atividadeSchemaZod.partial().strict();

// DISCIPLINAS
export const disciplinaSchemaZod = z.object({
    disciplina: z.string().min(2, "O nome da disciplina é muito curto"),
    forma_envio: z.enum(["E-mail", "Classroom"]),
    professor: z.object({
        nome: z.string().min(3).optional(),
        email: z.string().email("E-mail inválido").optional(),
        url: z.string().url("URL inválida").optional()
    }).optional()
}).strict();

export const disciplinaUpdateSchemaZod = disciplinaSchemaZod.partial().strict();
import { z } from "zod";

export const atividadeSchemaZod = z.object({
    titulo: z.string().min(3),
    descricao: z.string().min(3),
    id_disciplina: z.string().length(24, "ID de disciplina inválido"),
    disciplina: z.string(),
    prazo: z.string().pipe(z.coerce.date()),
    status: z.enum(["No prazo", "Atrasado", "Concluido", "Entregue"]).optional()
}).strict();
export const atividadeUpdateSchemaZod = atividadeSchemaZod.partial().strict();

export const disciplinaSchemaZod = z.object({
    disciplina: z.string().min(2, "O nome da disciplina é muito curto"),
    professor: z.object({
        nome: z.string().min(3, "O nome do professor é obrigatório"),
        forma_envio: z.enum(["E-mail", "Classroom"]),
        email: z.string().email("E-mail inválido").optional(),
        url: z.string().url("URL inválida").optional()
    })
}).strict().refine((data) => {
    if (data.professor.forma_envio === "E-mail" && !data.professor.email) return false;
    if (data.professor.forma_envio === "Classroom" && !data.professor.url) return false;
    return true;
}, {
    message: "E-mail ou URL obrigatórios dependendo da forma de envio escolhida.",
    path: ["professor"]
});
export const disciplinaUpdateSchemaZod = disciplinaSchemaZod.partial().strict();
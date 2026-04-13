export function tratarErro (res, er, acao) {
    // Se for erro do Zod, pegamos a primeira mensagem de validação
    if (er.name === "ZodError") {
        return res.status(400).json({ mensagem: er.errors[0].message });
    }

    // Se o erro tiver uma mensagem que nós definimos no Service (ex: "Atividade não encontrada")
    if (er.message && er.name !== "Error") { 
         // er.name !== "Error" ajuda a filtrar erros nativos do Node de erros personalizados
        return res.status(400).json({ mensagem: er.message });
    }

    // Erro genérico para falhas desconhecidas ou críticas
    console.error(`Erro crítico ao ${acao}: `, er);
    return res.status(500).json({ 
        mensagem: `Erro ao ${acao}. Por segurança, tente novamente.` 
    });
};
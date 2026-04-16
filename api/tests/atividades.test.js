import { expect, jest } from "@jest/globals";

// Mock do Model de Atividade
jest.unstable_mockModule("../models/atividadesSchema.js", () => {
    const MockModel = jest.fn().mockImplementation(function (dados) {
        this.save = jest.fn().mockResolvedValue({ _id: "abc", ...dados });
        return this;
    });
    MockModel.find = jest.fn();
    MockModel.findById = jest.fn();
    MockModel.findByIdAndUpdate = jest.fn();
    MockModel.findByIdAndDelete = jest.fn();
    return { Atividade: MockModel };
});

// Mock do Service de Disciplina (Para validar o ID da disciplina no teste)
jest.unstable_mockModule("../services/disciplinaServices.js", () => ({
    ListarDisciplinaPorId: jest.fn()
}));

// Imports Dinâmicos
const { 
    CriarAtividade, 
    ListarAtividades, 
    ListarAtividadePorId, 
    AlterarAtividade, 
    DeletarAtividade 
} = await import("../services/atividadeServices.js");
const { Atividade } = await import("../models/atividadesSchema.js");
const { ListarDisciplinaPorId } = await import("../services/disciplinaServices.js");

describe("Atividade Services - Testes Unitários", () => {

    const disciplinaMock = {
        _id: "disc123",
        disciplina: "Banco de Dados",
        professor: {
            nome: "Dr. Silva",
            email: "silva@fatec.br",
            url: "https://classroom.google.com/db"
        }
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    // --- HAPPY PATH (Caminho Feliz) ---

    test("[Happy Path] CriarAtividade: deve mapear E-mail corretamente quando a entrega for E-mail", async () => {
        ListarDisciplinaPorId.mockResolvedValue(disciplinaMock);
        
        const dados = {
            titulo: "Projeto Final",
            descricao: "Fazer o MER",
            id_disciplina: "disc123",
            prazo: new Date(),
            forma_envio: "E-mail"
        };

        const resultado = await CriarAtividade(dados, null);

        expect(resultado.professor.email).toBe(disciplinaMock.professor.email);
        expect(resultado.professor.url).toBeUndefined(); // Não deve injetar URL
        expect(Atividade).toHaveBeenCalled();
    });

    test("[Happy Path] CriarAtividade: deve mapear URL corretamente quando a entrega for Classroom", async () => {
        ListarDisciplinaPorId.mockResolvedValue(disciplinaMock);
        
        const dados = {
            forma_envio: "Classroom",
            id_disciplina: "disc123"
        };

        const resultado = await CriarAtividade(dados, null);

        expect(resultado.professor.url).toBe(disciplinaMock.professor.url);
        expect(resultado.professor.email).toBeUndefined();
        expect(Atividade).toHaveBeenCalled();
    });

    test("[Happy Path] ListarAtividades: deve retornar todas as atividades", async () => {
        Atividade.find.mockResolvedValue([{ titulo: "T1" }, { titulo: "T2" }]);
        const resultado = await ListarAtividades();
        expect(resultado).toHaveLength(2);
    });

    test("[Happy Path] ListarAtividades: deve filtrar por status corretamente", async () => {
        // Agora passamos apenas a STRING, como o seu Service espera
        const statusParaFiltrar = "No prazo";
        
        const listaFiltrada = [
            { titulo: "Tarefa 1", status: "No prazo" }
        ];

        // O Mock continua esperando que o Mongoose receba o objeto montado
        Atividade.find.mockResolvedValue(listaFiltrada);

        const resultado = await ListarAtividades(statusParaFiltrar);

        expect(resultado).toHaveLength(1);
        
        // Verificação: O Service deve ter montado o objeto corretamente para o Mongoose
        expect(Atividade.find).toHaveBeenCalledWith({ "status": "No prazo" });
    });

    test("[Happy Path] AlterarAtividade: deve atualizar o status com sucesso", async () => {
        Atividade.findById.mockResolvedValue({ _id: "atv123", status: "No prazo" });
        Atividade.findByIdAndUpdate.mockResolvedValue({ _id: "atv123", status: "Concluido" });

        const resultado = await AlterarAtividade("atv123", { status: "Concluido" });
        expect(resultado.status).toBe("Concluido");
    });

    // --- UNHAPPY PATH (Tratamento de Erros) ---

    test("[Unhappy Path] CriarAtividade: deve lançar erro se a disciplina não existir", async () => {
        ListarDisciplinaPorId.mockResolvedValue(null);

        await expect(CriarAtividade({ id_disciplina: "fake" }, null))
            .rejects
            .toThrow("A disciplina informada não foi encontrada.");
    });

    test("[Unhappy Path] ListarAtividadePorId: deve lançar erro se a atividade for nula", async () => {
        Atividade.findById.mockResolvedValue(null);

        await expect(ListarAtividadePorId("id_invalido"))
            .rejects
            .toThrow("Atividade não encontrada.");
    });

    test("[Unhappy Path] AlterarAtividade: deve impedir alteração de ID inexistente", async () => {
        Atividade.findById.mockResolvedValue(null);

        await expect(AlterarAtividade("999", { titulo: "Novo" }))
            .rejects
            .toThrow("Atividade não encontrada para alteração.");
    });

    test("[Unhappy Path] DeletarAtividade: deve lançar erro se tentar deletar algo que não existe", async () => {
        Atividade.findById.mockResolvedValue(null);

        await expect(DeletarAtividade("999"))
            .rejects
            .toThrow("Atividade não encontrada para exclusão.");
        
        expect(Atividade.findByIdAndDelete).not.toHaveBeenCalled();
    });

    test("[Happy Path] CriarAtividade: deve salvar caminho do anexo se enviado", async () => {
        ListarDisciplinaPorId.mockResolvedValue(disciplinaMock);
        const anexoMock = { path: "uploads/meu_arquivo.pdf" };

        const resultado = await CriarAtividade({ id_disciplina: "disc123", forma_envio: "Outro" }, anexoMock);

        expect(resultado.anexo).toBe("uploads/meu_arquivo.pdf");
    });
});
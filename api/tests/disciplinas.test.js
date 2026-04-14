import { expect, jest } from "@jest/globals";

// Cria um Mock (simulação de banco de dados) com todas as funções que serão usadas
jest.unstable_mockModule("../models/disciplinasSchema.js", () => {
    // Construtor para a função Create
    const MockModel = jest.fn().mockImplementation(function (dados) {
        this.save = jest.fn().mockResolvedValue({ _id: "abc", ...dados });
        return this;
    });

    // Outras Funções (Read, Update e Delete)
    MockModel.find = jest.fn();
    MockModel.findById = jest.fn();
    MockModel.findByIdAndUpdate = jest.fn();
    MockModel.findByIdAndDelete = jest.fn();

    return { Disciplina: MockModel };
});

// Import dinamico das funções a serem testadas
const { 
    CriarDisciplina, 
    ListarDisciplinas, 
    ListarDisciplinaPorId, 
    AlterarDisciplina, 
    DeletarDisciplina 
} = await import("../services/disciplinaServices.js");

// Import dinamico do Schema
const { Disciplina } = await import("../models/disciplinasSchema.js");

describe("Disciplina Services - Testes Unitários", () => {

    // Limpar os mocks após cada teste para um não interferir no outro
    afterEach(() => {
        jest.clearAllMocks();
    });

    // --- Testes CRUD - Happy Path ---

    // CREATE
    test("[Happy Path] CriarDisciplina: deve salvar com sucesso", async () => {
        const dados = {
            disciplina: "Node.js",
            professor: { nome: "Marcos", forma_envio: "E-mail", email: "marcos@teste.com" }
        };

        const resultado = await CriarDisciplina(dados);

        // Resultados esperados
        expect(resultado.disciplina).toBe("Node.js");
        expect(Disciplina).toHaveBeenCalled();
    });

    // READ
    test("[Happy Path] ListarDisciplinas: deve retornar um array", async () => {
        const listaFake = [{ _id: "1", disciplina: "A" }, { _id: "2", disciplina: "B" }];
        Disciplina.find.mockResolvedValue(listaFake);

        const resultado = await ListarDisciplinas();

        expect(resultado).toHaveLength(2);
        expect(resultado[0].disciplina).toBe("A");
    });

    // READ BY ID
    test("[Happy Path] ListarDisciplinasPorId: deve retornar uma disciplina", async () => {
        const listaFake = { _id: "1", disciplina: "A" };
        Disciplina.findById.mockResolvedValue(listaFake);

        const resultado = await ListarDisciplinaPorId("1");

        expect(Disciplina.findById).toHaveBeenCalledWith("1");
        expect(resultado.disciplina).toBe("A");
    });

    // UPDATE
    test("[Happy Path] AlterarDisciplina: deve atualizar os dados corretamente", async () => {
        const antiga = { _id: "1", disciplina: "Antiga" };
        const novosDados = { disciplina: "Nova" };
        
        Disciplina.findById.mockResolvedValue(antiga);
        Disciplina.findByIdAndUpdate.mockResolvedValue({ ...antiga, ...novosDados });

        const resultado = await AlterarDisciplina("1", novosDados);

        expect(resultado.disciplina).toBe("Nova");
    });

    // DELETE
    test("[Happy Path] DeletarDisciplina: deve deletar quando encontrar o ID", async () => {
        Disciplina.findById.mockResolvedValue({ _id: "1" });
        Disciplina.findByIdAndDelete.mockResolvedValue(true);

        await DeletarDisciplina("1");

        expect(Disciplina.findByIdAndDelete).toHaveBeenCalledWith("1");
    });


    // --- Testes CRUD - Unhappy Path ---

    // READ BY ID
    test("[Unhappy Path] ListarDisciplinaPorId: deve lançar erro se não encontrar", async () => {
        Disciplina.findById.mockResolvedValue(null);

        await expect(ListarDisciplinaPorId("id_que_nao_existe"))
            .rejects
            .toThrow("Disciplina não encontrada.");
    });

    // UPDATE
    test("[Unhappy Path] AlterarDisciplina: deve lançar erro se ID não existir", async () => {
        Disciplina.findById.mockResolvedValue(null);

        await expect(AlterarDisciplina("id_fantasma", { disciplina: "Nova" }))
            .rejects
            .toThrow("Disciplina não encontrada para alteração.");
    });

    // DELETE
    test("[Unhappy Path] DeletarDisciplina: deve lançar erro se ID não existir", async () => {
        Disciplina.findById.mockResolvedValue(null);
        
        await expect(DeletarDisciplina("id_fantasma"))
            .rejects
            .toThrow("Disciplina não encontrada para exclusão.");

        expect(Disciplina.findByIdAndDelete).not.toHaveBeenCalled();
    });
});
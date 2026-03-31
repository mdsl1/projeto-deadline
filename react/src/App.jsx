function App() {
  return (
    <main className="w-screen flex-col py-10 px-10 text-center h-screen text-white bg-zinc-800">
      <h1 className="text-2xl  mb-6">Proposta de projeto</h1>
      <p>Site para controle de atividades no estilo teams. A ideia é ter uma tela similar a tela de "Atribuições" do teams para estudantes, onde será possível adicionar, editar e filtrar as Atividades por status e disciplina. Também terá uma tela para cadastro e edição de Professores e Disciplinas, sendo nessa parte definido a forma de envio das Atividades (email ou classroom).</p>

      <h2 className="mt-8 text-xl">Lista de funções a serem implementadas:</h2>
      <ul className="mt-3">

        <li>Cadastro de Atividades (titulo, descrição, disciplina/ professor(forma de envio:email ou classroom), prazo, status(No prazo, atrasado, concluido, entregue), forma de anexar atividade)</li>
        <li>Cadastro de Professores e Disciplinas(disciplina, nome, forma de envio)</li>

        <li className="mt-5 mb-2 text-lg">Listagem de Atividades separadas por:</li>
        <ul>
          <li>Em breve: Onde prazo 'menor ou igual a' hoje</li>
          <li>Atrasado: Onde prazo 'maior que' hoje</li>
          <li>Concluido: Onde atividade já está resolvida, e falta apenas entregar (essa etapa pode ser pulada)</li>
          <li>Entregue: Atividade concluida e entregue ao professor, seja via email ou classroom</li>
        </ul>

      </ul>
    </main>
  )
}

export default App

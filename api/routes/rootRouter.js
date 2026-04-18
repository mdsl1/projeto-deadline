import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Projeto Deadline</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <style>
        pre, .emptyParams {
            background-color: #dddddd;
            padding: 10px;
            border-radius: 4px;
            text-align: left;
            font-size: 0.85rem;
            margin-bottom: 0;
            color: #000;
        }
        .emptyParams {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
        }
        .table td, .table th {
            vertical-align: middle !important;
            height: 1px;
        }
        .table-group-divider, thead {
            background-color: #000 !important; /* Um cinza um pouco mais claro que o table-dark */
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 0.9rem;
        }
        
        .table-group-divider td {
            border-top: 5px solid #fff;

        }
        .w-95 {
            width: 95%;
        }
    </style>
</head>

<body>
    <div class="container-fluid w-100 d-flex text-center flex-column justify-content-center p-5">

        <h1 class="mb-5">Bem vindo(a) à API do Projeto Deadline</h1>

        <p>Essas são todas as rotas e suas formas de uso:</p>
        
        <table class="table table-dark table-hover w-95 mx-auto my-3">
            <thead class="py-3">
                <tr>
                    <th style="width: 15%">Rota</th>
                    <th style="width: 5%">Método</th>
                    <th style="width: 30%">Descrição</th>
                    <th style="width: 25%">Input</th>
                    <th style="width: 25%">Output</th>
                </tr>
            </thead>

            <tbody>
            
                <!-- #=#=#=#=# Documentação da API #=#=#=#=# -->
                <tr>
                    <td><code>/api</code></td>
                    <td><span class="badge badge-success">GET</span></td>
                    <td>Rota raiz com a documentação da API</td>
                    <td><div class="text-center emptyParams">-</div></td>
                    <td><div class="text-center emptyParams">-</div></td>
                </tr>


                <!-- #=#=#=#=# ROTAS PARA DISCIPLINAS #=#=#=#=# -->
                <tr class="table-group-divider">
                    <td colspan="5" class="py-3">Gerenciamento de Disciplinas</td>
                </tr>

                <!-- #=#=#=#=# Inserir #=#=#=#=# -->
                <tr>
                    <td><code>/api/disciplinas</code></td>
                    <td><span class="badge badge-warning">POST</span></td>
                    <td>Rota para inserir uma disciplina.</td>
                    <td>
                        <pre><code>
{
    "disciplina": "Disciplina Teste",
    "forma_envio": "E-mail",
    "professor": {
        "nome": "Testador da Silva",
        "email": "aaa@gmail.com"
    }
}
                        </code></pre>
                    </td>
                    <td>
                        <pre><code>
{
    "disciplina": "Disciplina Teste",
    "professor": {
        "nome": "Testador da Silva",
        "email": "aaa@gmail.com",
        "url": null
    },
    "_id": "69e0f...",
    "criado": "2026-04..."
}
                        </code></pre>
                    </td>
                </tr>

                <!-- #=#=#=#=# Listar Todas #=#=#=#=# -->
                <tr>
                    <td><code>/api/disciplinas</code></td>
                    <td><span class="badge badge-success">GET</span></td>
                    <td>Rota para listar todas as disciplinas.</td>
                    <td><div class="text-center emptyParams">-</div></td>
                    <td>
                        <pre><code>
[
    {
    "disciplina": "Disciplina Teste",
    "professor": {
        "nome": "Testador da Silva",
        "email": "aaa@gmail.com",
        "url": null
    },
    "_id": "69e0f...",
    "criado": "2026-04..."
    }
    ... <i>Demais disciplinas</i>
]
                        </code></pre>
                    </td>
                </tr>

                <!-- #=#=#=#=# Listar Por ID #=#=#=#=# -->
                <tr>
                    <td><code>/api/disciplinas/:id</code></td>
                    <td><span class="badge badge-success">GET</span></td>
                    <td>Rota para listar uma disciplina pelo ID.</td>
                    <td><div class="text-center emptyParams">-</div></td>
                    <td>
                        <pre><code>
{
    "disciplina": "Disciplina Teste",
    "professor": {
        "nome": "Testador da Silva",
        "email": "aaa@gmail.com",
        "url": null
    },
    "_id": "69e0f...",
    "criado": "2026-04..."
}
                        </code></pre>
                    </td>
                </tr>

                <!-- #=#=#=#=# Alterar #=#=#=#=# -->
                <tr>
                    <td><code>/api/disciplinas/:id</code></td>
                    <td><span class="badge badge-info">PATCH</span></td>
                    <td>Rota para alterar uma disciplina pelo ID..</td>
                    <td>
                        <pre><code>
{
    "professor": {
        "url": "https://site.com.br"
    }
}
                        </code></pre>
                    </td>
                    <td>
                        <pre><code>
{
    "disciplina": "Disciplina Teste",
    "professor": {
        "nome": "Testador da Silva",
        "email": "aaa@gmail.com",
        "url": "https://site.com.br"
    },
    "_id": "69e0f...",
    "criado": "2026-04..."
}
                        </code></pre>
                    </td>
                </tr>
                
                <!-- #=#=#=#=# Deletar #=#=#=#=# -->
                <tr>
                    <td><code>/api/disciplinas/:id</code></td>
                    <td><span class="badge badge-danger">DELETE</span></td>
                    <td>Rota para apagar uma disciplina pelo ID.</td>
                    <td><div class="text-center emptyParams">-</div></td>
                    <td>
                        <pre><code>
{
    "mensagem": "Disciplina removida com sucesso."
}
                        </code></pre>
                    </td>
                </tr>
                

                <!-- #=#=#=#=# ROTAS PARA ATIVIDAES #=#=#=#=# -->
                <tr class="table-group-divider">
                    <td colspan="5" class="py-3">Gerenciamento de Atividades</td>
                </tr>

                <!-- #=#=#=#=# Inserir #=#=#=#=# -->
                <tr>
                    <td><code>/api/atividades</code></td>
                    <td><span class="badge badge-warning">POST</span></td>
                    <td>Rota para inserir uma atividade.</td>
                    <td>
                        <pre><code>
{
    "titulo": "Lista de Exercícios",
    "descricao": "Entregar em PDF",
    "id_disciplina": "69dd9...",
    "prazo": "2026-04-20",
    "forma_envio": "E-mail"
}
                        </code></pre>
                    </td>
                    <td>
                        <pre><code>
{
    "titulo": "Lista de Exercícios",
    "descricao": "Entregar em PDF",
    "id_disciplina": "69e02...",
    "disciplina": "Disciplina Teste",
    "forma_envio": "E-mail",
    "professor": {
        "nome": "Ximira da Silva",
        "email": "aaa@gmail.com"
    },
    "prazo": "2026-04...",
    "status": "No prazo",
    "anexo": null,
    "_id": "69e2d...",
    "criado": "2026-04...",
    "__v": 0
}
                        </code></pre>
                    </td>
                </tr>

                <!-- #=#=#=#=# Listar Todas #=#=#=#=# -->
                <tr>
                    <td><code>/api/atividades</code></td>
                    <td><span class="badge badge-success">GET</span></td>
                    <td>Rota para listar todas as atividades, podendo opcionalmente filtrar por status de atividade.</td>
                    <td>
                        <pre><code>
Query: ?status=No prazo
                        </pre></code>
                    </td>
                    <td>
                        <pre><code>
[
    {
        "titulo": "Lista de Exercícios",
        "descricao": "Entregar em PDF",
        "id_disciplina": "69e02...",
        "disciplina": "Disciplina Teste",
        "forma_envio": "E-mail",
        "professor": {
            "nome": "Ximira da Silva",
            "email": "aaa@gmail.com"
        },
        "prazo": "2026-04...",
        "status": "No prazo",
        "anexo": null,
        "_id": "69e2d...",
        "criado": "2026-04...",
        "__v": 0
    }
    ... <i>Demais atividades</i>
]
                        </code></pre>
                    </td>
                </tr>

                <!-- #=#=#=#=# Listar Por ID #=#=#=#=# -->
                <tr>
                    <td><code>/api/atividades/:id</code></td>
                    <td><span class="badge badge-success">GET</span></td>
                    <td>Rota para listar uma atividade pelo ID.</td>
                    <td><div class="text-center emptyParams">-</div></td>
                    <td>
                        <pre><code>
{
    "titulo": "Lista de Exercícios",
    "descricao": "Entregar em PDF",
    "id_disciplina": "69e02...",
    "disciplina": "Disciplina Teste",
    "forma_envio": "E-mail",
    "professor": {
        "nome": "Ximira da Silva",
        "email": "aaa@gmail.com"
    },
    "prazo": "2026-04...",
    "status": "No prazo",
    "anexo": null,
    "_id": "69e2d...",
    "criado": "2026-04...",
    "__v": 0
}
                        </code></pre>
                    </td>
                </tr>

                <!-- #=#=#=#=# Alterar #=#=#=#=# -->
                <tr>
                    <td><code>/api/atividades/:id</code></td>
                    <td><span class="badge badge-info">PATCH</span></td>
                    <td>Rota para alterar uma atividade pelo ID..</td>
                    <td>
                        <pre><code>
{
    "status": "Concluido"
}
                        </code></pre>
                    </td>
                    <td>
                        <pre><code>
{
    "titulo": "Lista de Exercícios",
    "descricao": "Entregar em PDF",
    "id_disciplina": "69e02...",
    "disciplina": "Disciplina Teste",
    "forma_envio": "E-mail",
    "professor": {
        "nome": "Ximira da Silva",
        "email": "aaa@gmail.com"
    },
    "prazo": "2026-04...",
    "status": "Concluido",
    "anexo": null,
    "_id": "69e2d...",
    "criado": "2026-04...",
    "__v": 0
}
                        </code></pre>
                    </td>
                </tr>

                <!-- #=#=#=#=# Deletar #=#=#=#=# -->
                <tr>
                    <td><code>/api/atividades/:id</code></td>
                    <td><span class="badge badge-danger">DELETE</span></td>
                    <td>Rota para apagar uma atividade pelo ID.</td>
                    <td><div class="text-center emptyParams">-</div></td>
                    <td>
                        <pre><code>
{
    "mensagem": "Atividade excluida com sucesso."
}
                        </code></pre>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>

    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js"></script>
</body>
</html>

    `);
});

export default router;
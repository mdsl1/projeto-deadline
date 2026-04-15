import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>API Projeto Deadline</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        </head>

        <body>
            <div class="container-fluid w-100 d-flex text-center flex-column justify-content-center p-5">

                <h1 class="mb-5">Bem vindo(a) à API do Projeto Deadline</h1>

                <p>Essas são todas as rotas e suas formas de uso:</p>
                <table class="w-75 text-center mx-auto my-3">
                    
                    <thead>
                        <th>Rota</th>
                        <th>Método</th>
                        <th>Descrição</th>
                        <th>Input</th>
                        <th>Output</th>
                    </thead>

                    <tbody>
                        <td>/api</td>
                        <td>GET</td>
                        <td>Rota com a documentação da API</td>
                        <td></td>
                        <td></td>
                </table>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
        </body>
        </html>

    `);
});

export default router;
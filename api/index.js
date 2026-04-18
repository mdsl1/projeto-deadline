import express from "express";
import cors from "cors";
import { connectDB } from "./connection_db.js";

const app = express();
app.use(cors());
app.use(express.json());

import rootRouter from "./routes/rootRouter.js";
app.use("/api", rootRouter);
app.get('/', (req, res) => {
    res.redirect('/api'); 
});

import atividadesRouter from "./routes/atividadesRouter.js";
app.use("/api/atividades", atividadesRouter);

import disciplinasRouter from "./routes/disciplinasRouter.js";
app.use("/api/disciplinas", disciplinasRouter);

// Tratamento para rotas não cadastradas
app.use((req, res) => {
    res.status(404).json({
        status: 404,
        error: "Rota não encontrada",
        message: "Parece que você se perdeu. Acesse a documentação para ver as rotas disponíveis.",
        docs: "http://127.0.0.1:3000/api"
    });
});

const port = 3000;
try {
    await connectDB();
    app.listen(port, () => console.log("Servidor rodando na porta ", port));
}
catch(er) {
    console.log("Erro ao iniciar API: ", er);
}

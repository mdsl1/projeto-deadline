import express from "express";
import cors from "cors";
import { connectDB } from "./connection_db.js";

const app = express();
app.use(cors());
app.use(express.json());

import rootRouter from "./routes/rootRouter.js";
app.use("/api", rootRouter);

import atividadesRouter from "./routes/atividadesRouter.js";
app.use("/api/atividades", atividadesRouter);

import disciplinasRouter from "./routes/disciplinasRouter.js";
app.use("/api/disciplinas", disciplinasRouter);

const port = 3000;
try {
    await connectDB();
    app.listen(port, () => console.log("Servidor rodando na porta ", port));
}
catch(er) {
    console.log("Erro ao iniciar API: ", er);
}

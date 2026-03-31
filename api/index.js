import express from "express";
import cors from "cors";
import { connectDB } from "./connection_db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>API do projeto Deadline</h1>");
});

const port = 3000;
try {
    await connectDB();
    app.listen(port, () => console.log("Servidor rodando na porta ", port));
}
catch(er) {
    console.log("Erro ao iniciar API: ", er);
}

import express from "express";
const app = express();
app.use(express.json());

const port = 3000;
app.listen(port, () => console.log('Servidor ouvindo na porta ', port));

app.get("/", (req, res) => {
    res.send("<h1>API do projeto Deadline</h1>");
});

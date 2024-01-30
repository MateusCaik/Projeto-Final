import express from "express";

const app = express();

//transformando de express direto para json
app.use(express.json())

const livros = [
    {id: 1, nome: "JJ"},
    {id: 2, nome: "FF"},
]

//Rota principal
app.get("/", (req, res) => {
    res.status(200).send("Biblioteca Virtual");
})

//consulta de livros
app.get("/livros", (req, res)=> {
    res.status(200).json(livros);
})

//cadastro de novo livro
app.post("/livros",  (req, res)=> {
    livros.push(req.body);
    res.status(201).send("Livro cadastrado com sucesso!");
})





export default app;
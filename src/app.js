import express from "express"
import dbConnect from "./config/dbConnect.js";
import cliente from "./config/models/Clientes.js";

const conexao = await dbConnect();
conexao.on("error", (erro) => {
    console.error("Erro na conexao!", erro)
})

conexao.once("open", () => {
    console.log("Conexao Efetuada!")
})
const app = express();

app.use(express.json()) //transforma p json antes de mostrar a res

//Rota Principal
app.get("/", (req, res) => {
    res.status(200).send("Api-Livros");
})

//Consultar todos os clientes
app.get("/clientes", async(req, res) => {
    const listarClientes = await cliente.find({})
    res.status(200).json(listarClientes);
})

//Consultar o cliente pelo id
app.get("/clientes/:id", (req, res) => {
    const index = buscarCliente(req.params.id); // (req.params.id) traz o parametro id na requisicao
    res.status(200).json(clientes[index]) // clientes é array, index recebeu o retorno da busca
})

//Cadastrar novo cliente
app.post("/clientes", (req, res) => {
    clientes.push(req.body);  //adiciona na ultima posicao
    res.status(201).send("Cliente cadastrado com sucesso!") //status 201 indica confirmacao que foi criado com sucesso
})

//Atualizar o cadastro de um cliente
app.put("/clientes/:id", (req,res) => {
    const index = buscarCliente(req.params.id);
    clientes[index].nome = req.body.nome; //acessar o nome na requisacao na parte "body"
    res.status(200).json(clientes) //exibe todos clientes

})
//nome atualizar, no PUT > body (json) > {"nome": "novo nome"}


//Excluir um cliente
app.delete("/clientes/:id", (req,res) => {
    const index = buscarCliente(req.params.id);
    clientes.splice(index, 1); //excluir posicao e quantas casas
    res.status(200).send("Cadastro removido com sucesso!") 

})


export default app;
const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const post = require("./models/post")

const handlebars = require("express-handlebars").engine

app.engine("handlebars", handlebars({defaultLayout:"main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extend: false}))
app.use(bodyParser.json())


//---------------------------------------------------------------/
//criando uma rota para o diretório principal do domínio
app.get("/", function(req, res) {
    res.render("primeira_pagina")
})

//---------------------------------------------------------------/
//criando uma rota para a segunda página
app.get("/cadastrar", function(req, res) {
    res.send("Formulário recebido!!")
})

app.post("/cadastrar", function(req, res){
    post.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data: req.body.data,
        observacao: req.body.observacao
        
    }).then(function(){
        res.send("Dados enviados com sucesso!")
    }).catch(function(erro){
        res.send("Falha ao cadastrar os dados: "+erro)
    });
})

//---------------------------------------------------------------/
//criando servidor web na porta 8081
app.listen(8081, function() {
    console.log("Servidor Ativo!!")
})
const express = require("express");
const controladorProduto = require("./controladores/teste");
const controladorCarrinho = require("./controladores/carrinho");
const controladorAdicionar = require("./controladores/addproduto");

const roteador = express.Router();

roteador.get("/produtos", controladorProduto.consultarProdutos);
roteador.get("/carrinho", controladorCarrinho.consultarCarrinho);
roteador.post("/carrinho/produtos", controladorAdicionar.adicionarProduto);
roteador.patch("/carrinho/produtos/:idConsultado", controladorAdicionar.editarProduto);
roteador.delete("/carrinho/produtos/:idConsultado", controladorCarrinho.deletarCarrinhoId);
roteador.delete("/carrinho", controladorCarrinho.deletarCarrinho);
roteador.post("/carrinho/finalizar-compra", controladorCarrinho.finalizarPedido);

module.exports = roteador;
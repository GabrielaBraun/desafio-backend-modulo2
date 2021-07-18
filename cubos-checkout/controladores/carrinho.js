const { escreverNoArquivo, lerArquivo } = require('../bibliotecaFS');
const addBusinessDays = require('date-fns/addBusinessDays')

const consultarCarrinho = async (req, res) => {
    const dadosDoArquivo = await lerArquivo();
        res.json(dadosDoArquivo.carrinho);
}; 

const deletarCarrinhoId = async (req, res) =>{
    const dadosDoArquivo = await lerArquivo();

    for (let produto of dadosDoArquivo.carrinho.produtos) {
           
        if(produto.id === Number(req.params.idConsultado)){
            const indice = dadosDoArquivo.carrinho.produtos.indexOf(produto);
            console.log(indice);
            dadosDoArquivo.carrinho.produtos.splice(indice, 1);
            dadosDoArquivo.carrinho.subtotal = dadosDoArquivo.carrinho.subtotal - produto.preco;
            dadosDoArquivo.carrinho.dataDeEntrega = addBusinessDays(new Date(), 15);
            dadosDoArquivo.carrinho.valorDoFrete = (dadosDoArquivo.carrinho.subtotal >= 2000 ? "0" : "500");
            dadosDoArquivo.carrinho.totalAPagar =  dadosDoArquivo.carrinho.subtotal + dadosDoArquivo.carrinho.valorDoFrete;

            await escreverNoArquivo(dadosDoArquivo);
            const carrinhoEditado = await lerArquivo();
            return res.json(carrinhoEditado.carrinho);
        }
        return res.json("Produto não encontrado");
    }

};

const deletarCarrinho = async (req, res) =>{
    const dadosDoArquivo = await lerArquivo();
        dadosDoArquivo.carrinho.produtos = [];
        dadosDoArquivo.carrinho.subtotal = 0;
        dadosDoArquivo.carrinho.dataDeEntrega = null;
        dadosDoArquivo.carrinho.valorDoFrete = 0;
        dadosDoArquivo.carrinho.totalAPagar =  0;
    
        await escreverNoArquivo(dadosDoArquivo);
        const produtodeletado = await lerArquivo();
        return res.json(produtodeletado.carrinho);
};

const finalizarPedido = async (req, res) => {
    const dadosDoArquivo = await lerArquivo();
    if(dadosDoArquivo.carrinho.totalAPagar === 0){
        return res.json("Erro")
    }
    if(dadosDoArquivo.carrinho.produtos.quantidade <= dadosDoArquivo.carrinho.produtos.estoque){
        return res.json(dadosDoArquivo.carrinho)
    } else{
        return res.json("Erro")
    }
}

module.exports = {
    consultarCarrinho,
    deletarCarrinhoId,
    deletarCarrinho,
    finalizarPedido
};
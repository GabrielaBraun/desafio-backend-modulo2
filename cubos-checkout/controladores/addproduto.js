const { escreverNoArquivo, lerArquivo } = require('../bibliotecaFS');
const addBusinessDays = require('date-fns/addBusinessDays')

const adicionarProduto = async (req, res) => {
    const dadosDoArquivo = await lerArquivo();

    for (let produto of dadosDoArquivo.produtos) {
        console.log(produto)
        if(produto.id === req.body.id){
            if(produto.estoque >= req.body.quantidade){
                dadosDoArquivo.carrinho.produtos.push(produto);
                dadosDoArquivo.carrinho.subtotal = dadosDoArquivo.carrinho.subtotal + produto.preco;
                dadosDoArquivo.carrinho.dataDeEntrega = addBusinessDays(new Date(), 15);
                dadosDoArquivo.carrinho.valorDoFrete = (dadosDoArquivo.carrinho.subtotal >= 2000 ? "0" : "500");
                dadosDoArquivo.carrinho.totalAPagar =  dadosDoArquivo.carrinho.subtotal + dadosDoArquivo.carrinho.valorDoFrete;

                await escreverNoArquivo(dadosDoArquivo);
                const produtoNoCarrinho = await lerArquivo();
                return res.json(produtoNoCarrinho.carrinho);

            } 
            return res.json("não há estoque");

        } 
        
    } 
    return res.json("id não encontrado");      
};

const editarProduto = async (req, res) =>{
    const dadosDoArquivo = await lerArquivo();

    for (let produto of dadosDoArquivo.carrinho.produtos) {
        if(produto.id === Number(req.params.idConsultado)){
            if(req.body.quantidade > 0 && req.body.quantidade <= produto.estoque){
                dadosDoArquivo.carrinho.subtotal = dadosDoArquivo.carrinho.subtotal + (produto.preco * req.body.quantidade);
                dadosDoArquivo.carrinho.dataDeEntrega = addBusinessDays(new Date(), 15);
                dadosDoArquivo.carrinho.valorDoFrete = (dadosDoArquivo.carrinho.subtotal >= 2000 ? "0" : "500");
                dadosDoArquivo.carrinho.totalAPagar =  dadosDoArquivo.carrinho.subtotal + dadosDoArquivo.carrinho.valorDoFrete;
                produto.estoque = produto.estoque - req.body.quantidade;

                await escreverNoArquivo(dadosDoArquivo);
                const produtoEditado = await lerArquivo();
                res.json(produtoEditado.carrinho); 
                return             
            }  
            else if(req.body.quantidade < 0 && req.body.quantidade <= produto.estoque){
                dadosDoArquivo.carrinho.subtotal = dadosDoArquivo.carrinho.subtotal + (produto.preco * req.body.quantidade);
                dadosDoArquivo.carrinho.dataDeEntrega = addBusinessDays(new Date(), 15);
                dadosDoArquivo.carrinho.valorDoFrete = (dadosDoArquivo.carrinho.subtotal >= "2000" ? 0 : "500");
                dadosDoArquivo.carrinho.totalAPagar =  dadosDoArquivo.carrinho.subtotal + dadosDoArquivo.carrinho.valorDoFrete;
                produto.estoque = produto.estoque + req.body.quantidade;

                await escreverNoArquivo(dadosDoArquivo);
                const produtoEditado = await lerArquivo();
                res.json(produtoEditado.carrinho);
                return
            }
            return res.json("Quantidade e estoque não são compatíveis")
        }
        return res.json("Este produto não consta no carrinho")
        } 
};  


module.exports = {
    adicionarProduto,
    editarProduto
};


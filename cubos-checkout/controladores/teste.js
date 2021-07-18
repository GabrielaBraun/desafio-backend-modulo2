const { lerArquivo } = require('../bibliotecaFS');

const consultarProdutos = async (req, res) => {
    const dadosDoArquivo = await lerArquivo();
    
    if (req.query.precoInicial && req.query.precoFinal && req.query.categoria){
        const produtosPorPrecoECategoria = dadosDoArquivo.produtos.filter(x => x.preco >= req.query.precoInicial && x.preco <= req.query.precoFinal && x.categoria.toLowerCase() === req.query.categoria);
        res.json(produtosPorPrecoECategoria);
        return;
    }
    else if (req.query.precoInicial && req.query.precoFinal){
        const produtosPorPreco = dadosDoArquivo.produtos.filter(x => x.preco >= req.query.precoInicial && x.preco <= req.query.precoFinal);
        res.json(produtosPorPreco);
        return;
    }    
    else if(req.query.estoque){ 
            const produtosEmEstoque = dadosDoArquivo.produtos.filter(x => x.estoque === Number(req.query.estoque) && x.estoque >= 1);    
            res.json(produtosEmEstoque);
            return;
        }
    else if (req.query.categoria){
            const produtosPorCategoria = dadosDoArquivo.produtos.filter(x => x.categoria.toLowerCase() === req.query.categoria);
            res.json(produtosPorCategoria);
            return;
        }
        
        

        res.json(dadosDoArquivo.produtos);
    };



    module.exports = {consultarProdutos};
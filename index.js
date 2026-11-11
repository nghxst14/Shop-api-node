// 1. Importações de bibliotecas e módulos
const express = require('express');

// 2. Criar a app e definir porto
const api = express();
const port = 3000;

// 3. MIddleware
api.use(express.json());

// 4. Dados em memória e rotas
let products =[ 
    {id: 1 , name: 'Rato', price: 20},
    {id: 2 , name: 'Teclado', price: 40}
];

let nextProductId = 3

api.get('/products', (req, res) => {
    res.status(200).json(products);
});

api.get('/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: `Id invalido` });
    }

    if (!product) { 
        return res.status(404).json({ erro: `Produto com id: ${id}, não existe` });  
    }

    res.status(200).json(product);  
});

api.post('/products', (req , res) => {
    if (typeof nome !== 'string' || name.trim() === ''){
        return res.status(400).json({ erro: 'Nome invalido' });
    }
    if (!Number.isInteger(age) || age<0){
        return res.status(400).json({ erro:'idade invalida' });
    }
    const product = {id:nextProductId++, name: req.body.name, price: req.body.price};
    products.push(product);
    res.status(201).location(`/products/${product.id}`).json(product);
});

// 5. Iniciar o servidor
api.listen(port, () => {
    console.log(`Servidor rollin em http://localhost:${port}`);
});
const express = require('express');

const server = express();

server.use(express.json());

const assistencia = [

    {cliente: 'Liu Kang', servico: 'Troca de bateria Iphone 7', orcamento: 'R$160,00'},
    {cliente: 'Nosferatu', servico: 'Troca de tela Samsung A50', orcamento: 'R$680,00'},
    {cliente: 'Tirocerto karabina', servico: 'Troca de conector de carga, flex do ID e tela j5 Prime', orcamento: 'R$200,00'}
    
]
server.get('/assistencia', function(request, response) {
    response.json(assistencia);
})
server.post('/assistencia', function(request, response) {
    
    //const id = request.body.id;
    //const cliente = request.body.cliente;
    //const servico = request.body.servico;
    //const orcamento = request.body.orcamento;

    const {cliente, servico, orcamento} = request.body;

    assistencia.push({cliente, servico, orcamento});
    response.status(204).send();
})

server.put('/assistencia/:id', function(request, response) {
    const id = request.params.id;
    const {cliente, servico, orcamento} = request.body;

    for(let i = 0; i < assistencia.length; i++) {
        if(assistencia[i].cliente == id) {
            assistencia[i].cliente = cliente;
            assistencia[i].servico = servico;
            assistencia[i].orcamento = orcamento
            break;
        };
        
    }
    return response.status(204).send();
})

server.delete('/assistencia/:id', function(request, response) {
    
    const id = request.params.id;
    
    for(let i = 0; i < assistencia.length; i++) {
        if(assistencia[i].cliente == id) {
            assistencia.splice(i, 1);
            break;
        }
    }
    return response.status(204).send();
})

server.listen(process.env.PORT || 3000);
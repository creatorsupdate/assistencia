const express = require('express');

const server = express();

server.use(express.json());

const assistencia = [

    {id: 01, cliente: 'Liu Kang', servico: 'Troca de bateria Iphone 7', orcamento: 'R$160,00'},
    {id: 02, cliente: 'Nosferatu', servico: 'Troca de tela Samsung A50', orcamento: 'R$680,00'},
    {id: 03, cliente: 'Tirocerto karabina', servico: 'Troca de conector de carga, flex do ID e tela j5 Prime', orcamento: 'R$200,00'}
    
]
server.get('/assistencia', function(request, response) {
    response.json(assistencia);
});
server.post('/assistencia', function(request, response) {
    
    //const id = request.body.id;
    //const cliente = request.body.cliente;
    //const servico = request.body.servico;
    //const orcamento = request.body.orcamento;

    const {id, cliente, servico, orcamento} = request.body;

    assistencia.push({id, cliente, servico, orcamento});
    response.status(204).send();
})

server.put('/assistencia/:nome', function(request, response) {
    const { nome } = request.params.nome;
    const {id, cliente, servico, orcamento} = request.body;

    for(let i = 0; i < assistencia.length; i++) {
        if(assistencia[i].id == nome) {
            assistencia[i].id == id;
            assistencia[i].cliente = cliente;
            assistencia[i].servico = servico;
            assistencia[i].orcamento = orcamento
            break;
        };
        
    }
    return response.status(204).send();
})

server.delete('/assistencia:id', function(request, response) {
    
    const nome = request.params.nome;
    
    for(let i = 0; i < assistencia.length; i++) {
        if(assistencia[i].id == nome) {
            assistencia.splice(i, 1);
            break;
        }
    }
    return response.status(204).send();
})

server.listen(process.env.PORT || 3000);
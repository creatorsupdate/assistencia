const express = require('express');
const Pool = require('pg').Pool;
const cors = require('cors');

const server = express();
server.use(cors());

const pool = new Pool({  
    user: 'rsxlswlemfntrc', 
    password: 'fb0d25ed369df4906704bf84fee5aaeb72d3bc7c8b8468eef5e3f2db1467c9d2',
    host: 'ec2-52-20-248-222.compute-1.amazonaws.com',
    database: 'db241e1gfgp83',
    port: '5432',
    ssl: { rejectUnauthorized: false }
});

server.use(express.json());

server.get('/assistencia', async function(request, response) {
    const result = await pool.query('SELECT * FROM assistencia');
    return response.json(result.rows);
})
server.post('/assistencia', async function(request, response) {
    
    //const id = request.body.id;
    //const cliente = request.body.cliente;
    //const servico = request.body.servico;
    //const orcamento = request.body.orcamento;

    const {cliente, servico, orcamento} = request.body;
    
    const sql = `
    INSERT INTO assistencia (cliente, servico, orcamento, situacao) VALUES ($1, $2, $3, $4, $5)
    `;

    await pool.query(sql, [cliente, servico, orcamento, situacao]);
    return response.status(201).send();
});

    //assistencia.push({cliente, servico, orcamento});
    //response.status(204).send();

server.put('/assistencia/:id', async (request, response) => {
    const {id} = request.params;
    const {cliente, servico, orcamento, situacao} = request.body;
    
    //for(let i = 0; i < assistencia.length; i++) {
    //    if(assistencia[i].cliente == id) {
    //        assistencia[i].cliente = cliente;
    //        assistencia[i].servico = servico;
    //        assistencia[i].orcamento = orcamento
    //        break;
    //    };
        
    const sql = `
    UPDATE assistencia SET cliente = $1, servico = $2, orcamento = $3, situacao = $4  WHERE id = $5
    `;
    
    await pool.query(sql, [nome,numero,idade,salario,contrato,id]);
    return response.status(204).send();
});      
    
server.delete('/assistencia/:id', async function(req, res){
    const id = req.params.id;
    
    //for(let i = 0; i < assistencia.length; i++) {
    //    if(assistencia[i].cliente == id) {
    //        assistencia.splice(i, 1);
    //        break;
    //    }
    //}
    sql = 'DELETE FROM assistencia WHERE id = $1';

    await pool.query(sql, [id]);

    res.send();
})
    
server.listen(process.env.PORT || 3000);
const express = require('express');
const Pool = require('pg').Pool;
const cors = require('cors');
const pool = new Pool({  
    user: 'kdeeadvhgtlada', 
    password: '17270321d0b1a4b2415ac1f382f375f09a00c9fb8d6e2f51d49895abbf45ef6e',
    host: 'ec2-52-0-155-79.compute-1.amazonaws.com',
    database: 'd90gr36llqr8en',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

const server = express();

server.use(cors());

server.use(express.json());

server.get('/assistencia', async function(request, response) {
    const result = await pool.query('SELECT * FROM assistencia');
    return response.json(result.rows);
})

// request.params.id -> /tarefa/:id
// request.body -> corpo da mensagem
// request.query.name -> /tarefa/?name=abc

server.get('/assistencia/search', async function(request, response) {
    const cliente = request.query.cliente;
    const servico = request.query.servico;
    const orcamento = request.query.orcamento;
    const situacao = request.query.situacao;

    const sql = `SELECT * FROM assistencia WHERE cliente ILIKE $1`;
    const result = await pool.query(sql, ["%" +  cliente + "%"]);
    return response.json(result.rows);
})

server.get('/assistencia/:id', async function(request, response) {
    const id = request.params.id;
    const sql = `SELECT * FROM assistencia WHERE id = $1`
    const result = await pool.query(sql, [id]);
    return response.json(result.rows);
})

server.post('/assistencia', async function(request, response) {
    const cliente = request.body.cliente; // JSON
    const servico = request.body.servico;
    const orcamento = request.body.orcamento;
    const situacao = request.body.situacao;

    // SQL Injection
    // const sql = `INSERT INTO assistencia (cliente, servico, orcamento, situacao) VALUES (`+ cliente + `, false)`;
    const sql = `INSERT INTO assistencia (cliente, servico, orcamento, situacao) VALUES ($1, $2,$3, $4)`;
    await pool.query(sql, [cliente, servico, orcamento, situacao]);
    return response.status(204).send(); 
})

server.delete('/assistencia/:id', async function(request, response) { 
    const id = request.params.id;
    const sql = `DELETE FROM assistencia WHERE id = $1`;
    await pool.query(sql, [id]);
    return response.status(204).send();
})

server.put('/assistencia/:id', async function(request, response) {
    const id = request.params.id;
    const { cliente, servico, orcamento, situacao } = request.body;
    const sql = `UPDATE assistencia SET cliente = $1, servico = $2, orcamento = $3, situacao = $4, WHERE id = $5`;
    await pool.query(sql, [cliente, servico, orcamento, situacao, id]);
    return response.status(204).send();
})

//server.patch('/assistencia/:id/situacao', async function(request, response) {
//    const id = request.params.id;
//    const sql = `UPDATE assistencia SET situacao = true WHERE id = $1`;
//    await pool.query(sql, [id]);
//    return response.status(204).send();
//})

//server.patch('/assistencia/:id/unsituacao', async function(request, response) {
//    const id = request.params.id;
//    const sql = `UPDATE assistencia SET situacao = false WHERE id = $1`;
//    await pool.query(sql, [id]);
//    return response.status(204).send();
//}) 

// escutar um porta com as requisições HTTP:
server.listen(process.env.PORT || 3000);

const Pool = require('pg').Pool;

const pool = new Pool({  
    user: 'rsxlswlemfntrc', 
    password: 'fb0d25ed369df4906704bf84fee5aaeb72d3bc7c8b8468eef5e3f2db1467c9d2',
    host: 'ec2-52-20-248-222.compute-1.amazonaws.com',
    database: 'db241e1gfgp83',
    port: '5432',
    ssl: { rejectUnauthorized: false }
});

const sql_insert = `
        INSERT INTO assistencia (cliente, servico, orcamento, situacao)
            VALUES 
                ('Shutakoko Nakara', 'troca de tela Iphone 7', 240,00, 'aprovado')`;

pool.query(sql_insert, function(error, result) {
        if(error)
            throw error;
        
        console.log(result.rowCount);
})

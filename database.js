const Pool = require('pg').Pool;

const pool = new Pool({

    user:'kdeeadvhgtlada',
    password:'17270321d0b1a4b2415ac1f382f375f09a00c9fb8d6e2f51d49895abbf45ef6e',
    host:'ec2-52-0-155-79.compute-1.amazonaws.com',
    database:'d90gr36llqr8en',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

//const sql = `
//    CREATE TABLE IF NOT EXISTS assistencia
//    (
//        ID serial primary key,
//        cliente varchar(50) not null,
//        servico varchar(100) not null,
//        orcamento int not null,
//        situacao varchar(30) not null
//    )
//`;

//pool.query(sql, function(error, result) {
//    if(error)
//        throw error

//    console.log('Tabela criada com sucesso!');
//})

const sql_insert = `
        INSERT INTO assistencia (cliente, servico, orcamento, situacao)
            VALUES 
                ('Shutakoko Nakara', 'Troca de frontal Iphone 7 preto', 250, 'aprovado')
`;

pool.query(sql_insert, function(error, result) {
        if(error)
            throw error;
        
        console.log(result.rowCount);
})

//const sql_select = `SELECT * FROM assistencia`;

//pool.query(sql_select, function(error, result) {
//     if(error)
//		    throw error;
	
//	    console.log(result.rows);
//})
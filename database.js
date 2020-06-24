const Pool = require('pg').Pool;

const pool = new Pool({  
    user: 'rsxlswlemfntrc', 
    password: 'fb0d25ed369df4906704bf84fee5aaeb72d3bc7c8b8468eef5e3f2db1467c9d2',
    host: 'ec2-52-20-248-222.compute-1.amazonaws.com',
    database: 'db241e1gfgp83',
    port: '5432',
    ssl: { rejectUnauthorized: false }
});

   const sql = `
    CREATE TABLE IF NOT EXISTS assistencia 
    (
        id serial primary key,
        cliente varchar(200) not null,
        servico varchar(3),
        orcamento varchar(11),
        situacao varchar(50)
       
    )
`;
    pool.query(sql, function(error, result) {
    if(error)
        throw error;
});

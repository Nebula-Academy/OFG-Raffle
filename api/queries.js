const dotenv = require('dotenv');
dotenv.config();
const password = process.env.PSQL_PASS
const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'ofg-admin',
    password: 'BzhN@5psjDYbL0V$gfl7!wAz&',
    host: 'ofg-raffle.chivpnllwkir.us-east-1.rds.amazonaws.com',
    database: 'postgres',
    port: 5432
})

const getTable = (request, response) => {
    pool.query(`SELECT * FROM ${request.params.table}`, (error, result) => {
        if (error) {
            throw error;
        }
        console.log(result);
        response.status(200).json(result.rows);
    });
}

const postTable = (request, response) => {
    const { table } = request.params;
    const values = Object.values(request.body)
    const keys = Object.keys(request.body);
    const number = Object.keys.length;
    let PSQLvalueString = ''
    for (i = 0; i < number; i++) {
        PSQLvalueString += `$${i + 1}`
    }
    pool.query(
        `INSERT INTO ${table} ${(keys.join(','))} VALUES ${PSQLvalueString} RETURNING *`,
        values,
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    )
}

module.exports = {
    getTable,
    postTable
}
const dotenv = require('dotenv');
dotenv.config();
const {PSQL_PASS} = process.env;
const {PSQL_HOST} = process.env;
const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'ofg-admin',
    password: PSQL_PASS,
    host: PSQL_HOST,
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
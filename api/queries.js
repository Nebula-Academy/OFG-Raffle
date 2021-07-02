const dotenv = require('dotenv');
dotenv.config();
const { PSQL_PASS, PSQL_HOST, PSQL_USER } = process.env;
const Pool = require('pg').Pool;

const pool = new Pool({
    user: PSQL_USER,
    password: PSQL_PASS,
    host: PSQL_HOST,
    database: 'raffle',
    port: 5432
});

const getTable = (request, response) => {
    pool.query(`SELECT * FROM ${request.params.table}`, (error, result) => {
        if (error) {
            throw error;
        }
        response.status(200).json(result.rows);
    });
}

const getTableById = (request, response) => {
    pool.query(`SELECT * FROM ${request.params.table} WHERE ${request.params.table}_id = ${request.params.id}`, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const postTable = (request, response) => {
    const { table } = request.params;
    const values = Object.values(request.body)
    const keys = Object.keys(request.body);
    let PSQLvalueString = ''
    for (i = 0; i < keys.length; i++) {
        PSQLvalueString += `$${i + 1}${i != keys.length - 1 ? ',' : ''}`
    }
    pool.query(
        `INSERT INTO ${table} (${(keys.join(','))}) VALUES (${PSQLvalueString}) RETURNING *`,
        values,
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    )
}


const deleteTableByID = (request, response) => {
    const { table, id } = request.params;
    pool.query(`DELETE FROM ${table} WHERE ${table}_id = ${id}`, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows)
    })
}

const updateTable = (request, response) => {
    const { table, id } = request.params;
    const values = Object.values(request.body)
    const keys = Object.keys(request.body);
    const number = Object.keys.length;
    const configureString = () => {
        let sqlStatement = "";
        for (let i = 0; i < keys.length; i++) {
            if (i === keys.length - 1) sqlStatement += `${keys[i]}=$${i + 1}`
            else sqlStatement += `${keys[i]}=$${i + 1}, `
        }
        return sqlStatement
    }

    pool.query(`UPDATE ${table} SET ${configureString()} WHERE ${table}_id=${id} RETURNING *`, values, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


module.exports = {
    getTable,
    getTableById,
    postTable,
    updateTable,
    deleteTableByID
}
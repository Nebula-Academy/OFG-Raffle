const dotenv = require('dotenv');
dotenv.config();
const { PSQL_PASS, PSQL_HOST, PSQL_USER } = process.env;
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const JWK = require('./userpoolJWK.json');
const Pool = require('pg').Pool;

// Using the Access token
const pem = jwkToPem(JWK['keys'][1]);

console.log("ok -->", pem)
const pool = new Pool({
    user: PSQL_USER,
    password: PSQL_PASS,
    host: PSQL_HOST,
    database: 'raffle',
    port: 5432
});

const createMember = (request, response) => {
    const { username } = request.body;
    pool.query(`INSERT INTO member (email) VALUES ($1) RETURNING *`, [username], (error, results) => {
        if(error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const getMember = (request, response) => {
    pool.query(`SELECT * FROM member WHERE email = '${request.params.username}'`, (error, results) => {
        if(error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const getTable = (request, response) => {
    console.log(request.headers.authentication, "<--- REQUEST");
    response.status(200)
    // Find jwt token on request
    // IF WE DECODE THE ACCESS TOKEN (JWT) WE SHOULD BE ABLE TO GET THE 

    // Figure out how to compare the local key ID (kid) to the public key (pem)
    jwt.verify(request.headers.authentication, pem, { algorithms: ['RS256'] }, (err, decodedtoken) => {
        if(err) {
            console.log("Error: " + err);
            return null;
        }
        console.log(decodedtoken, "<--- decoded token");
        // pool.query(`SELECT * FROM ${request.params.table}`, (error, result) => {
        //     if (error) {
        //         throw error;
        //     }
        //     response.status(200).json(result.rows);
        // });
    })
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
    createMember,
    getMember,
    deleteTableByID
}
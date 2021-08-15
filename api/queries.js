const dotenv = require('dotenv');
dotenv.config();
const { PSQL_PASS, PSQL_HOST, PSQL_USER } = process.env;
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const JWK = require('./userpoolJWK.json');
const Pool = require('pg').Pool;
const allowTables = ['member', 'category', 'raffle', 'ticket', 'winner']
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'yvette29@ethereal.email',
        pass: 'DQFydEDBR2qBP1kzW7'
    }
});

// Using the Access token
const pem = jwkToPem(JWK['keys'][1]);

const pool = new Pool({
    user: PSQL_USER,
    password: PSQL_PASS,
    host: PSQL_HOST,
    database: 'raffle',
    port: 5432
});

const authCheck = (request, func) => {
    jwt.verify(request.headers.authentication, pem, { algorithms: ['RS256'] }, (err, ) => {
        if(err) throw err;
        func();
    });
}

const createMember = (request, response) => {
    try {
        const { username } = request.body;
        pool.query(`INSERT INTO member (email) VALUES ($1) RETURNING *`, [username], (error, results) => {
            if(error) {
                throw error;
            }
            response.status(200).json(results.rows);
        });
    } catch (error) {
        console.log("Something went wrong: " + error);
    }
}

const getMember = (request, response) => {
    try {
        // authCheck(request, () => {
        pool.query(`SELECT * FROM member WHERE email = $1`,[request.params.username], (error, results) => {
            if(error) {
                throw error;
            }
            response.status(200).json(results.rows);
        });
        // })
    } catch(error){
        console.log("Something went wrong: " + error);
        response.status(500).json(error);
    }
}

const getTable = (request, response) => {
    const {table} = request.params 
    if(!allowTables.includes(table)){
        return response.sendStatus(404)
    }

    try {
        pool.query(`SELECT * FROM ${table}`, (error, result) => {
            if (error) {
                console.log("Query Error");
                throw error;
            }
            response.status(200).json(result.rows);
        });
    }
    catch (error) {
        console.log("Something went wrong: " + error);
    }
}

const getTableById = (request, response) => {
    try {
        pool.query(`SELECT * FROM ${request.params.table} WHERE ${request.params.table}_id = ${request.params.id}`, (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        })
    } catch (error) {
        console.log("Something went wrong: " + error);
    }
}

const postTable = (request, response) => {
    const { table } = request.params;
    if(!allowTables.includes(table)){
        return response.sendStatus(404)
    };
    try {
        authCheck(request, () => {
            const values = Object.values(request.body)
            const keys = Object.keys(request.body);
            let PSQLvalueString = ''
            for (i = 0; i < keys.length; i++) {
                PSQLvalueString += `$${i + 1}${i !== keys.length - 1 ? ',' : ''}`
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
        });
    } catch (error) {
        console.log("Something went wrong: " + error);
    }
}


const deleteTableByID = (request, response) => {
    const { table, id } = request.params;
    if(!allowTables.includes(table)){
        return response.sendStatus(404)
    };
    try {
        authCheck(request, () => {
            pool.query(`DELETE FROM ${table} WHERE ${table}_id = ${id}`, (error, results) => {
                if (error) {
                    throw error;
                }
                response.status(200).json(results.rows)
            })
        })
    } catch (error) {
        console.log("Something went wrong: " + error);
    }
}

const testRaffleWinner = () => {
    pool.query(`SELECT * FROM raffle WHERE raffle_id = 1`, (error, results) =>{
        if (error) {
            throw error;
        }
        chooseRaffleWinner(results.rows[0])
    });
}
//testRaffleWinner()

const chooseRaffleWinner = async (raffle) => {
    //fetch all tickets with raffle.raffle_id 
    pool.query(`SELECT * FROM ticket WHERE raffle_id = ${raffle.raffle_id}`, (error, results) => {
        if (error){
            throw error;
        }
        //choose 1 random winner from that list 
        const winner = results.rows[Math.floor(Math.random() * results.rows.length)]
        //insert them into our winners table
        pool.query(`INSERT INTO winner (member_id, raffle_id) VALUES ($1, $2)`, [winner.member_id, winner.raffle_id])
        // need to get email from members table with get request from winner.member_id
        pool.query(`SELECT * FROM member WHERE member_id = $1`, [winner.member_id], async (error2, results2) => {
            if(error2){
                throw error2;
            }
            const member = results2.rows[0];
            const winnerMessage = {
                from: 'no-reply@ourfuturegeneration.org',
                to: member.email, 
                subject: 'Congratulations!',
                html: `<p>You're ticket was selcted for the ${raffle.title} raffle. You Win!</p> <p>We will be shipping you're prize to the mailing adress on your account as soon as possible.</p>`
            }
            transporter.sendMail(winnerMessage);
            const adminMessage = {
                from: 'no-reply@ourfuturegeneration.org',
                to: 'admin@ourfuturegeneration.org', 
                subject: `Winner chosen for ${raffle.title} raffle`,
                html: `<p>${JSON.stringify(member)}</p>`
            }
            transporter.sendMail(adminMessage);
        })  
        
    });
};

const updateTable = (request, response) => {
    const { table, id } = request.params;
    if(!allowTables.includes(table)){
        return response.sendStatus(404)
    };
    try {
        authCheck(request, () => {
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
        });
    } catch (error) {
        console.log("Something went wrong: " + error);
    }
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
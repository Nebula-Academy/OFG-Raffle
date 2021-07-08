const dotenv = require('dotenv');
dotenv.config();
const { PSQL_PASS, PSQL_HOST, PSQL_USER } = process.env;
const Pool = require('pg').Pool;
// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'yvette29@ethereal.email',
//         pass: 'DQFydEDBR2qBP1kzW7'
//     }
// });
// const message = {
//     from: 'yvette29@ethereal.email',
//     to: winner.email, 
//     subject: 'Congratulations!',
//     html: "<p>You're ticket was selcted for the {raffle.title} raffle. You Win!</p>"
// }

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

const chooseRaffleWinner = (raffle) =>{
    //fetch all tickets with raffle.raffle_id 
    pool.query(`SELECT * FROM raffle WHERE raffle_id = ${raffle.raffle_id}`, (error, results) => {
        if (error){
            throw error;
        }
        //choose 1 random winner from that list 
        const winner = results.rows[Math.floor(Math.random() * results.rows.length)]
        //insert them into our winners table
        pool.query(`INSERT INTO winner (member_id, raffle_id) VALUES ($1, $2)`, [winner.member_id, winner.raffle_id])
        //email notification? 
            // need to get email from members table with get request from winner.member_id
    }) 
    pool.query(`SELECT * FROM member WHERE member_id = $1`, [winner.member_id])
    transporter.sendmail(message)
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
        if(table == 'raffle' && results.rows[0].total_tickets == results.rows[0].tickets_sold){
            chooseRaffleWinner(results.rows[0])
        }
        response.status(200).json(results.rows)
    })
}


module.exports = {
    getTable,
    getTableById,
    postTable,
    updateTable,
    deleteTableByID,
    chooseRaffleWinner
}
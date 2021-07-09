const bcrypt = require('bcrypt');
const express  = require('express'); 
const app = express();
const db = require('./queries.js');
const port = 3030;
const cors = require("cors");

const createHeader = async () => {
    return bcrypt.hash(Math.round(+Date.now() / 60000) * 60000), process.env.TOKEN_SALT
}

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.get('/', (request, response) => {
    response.json({ info: 'Thanks for connecting to our API' })
});

app.get('/favico.ico', (req, res) => {
    res.sendStatus(404);
});

app.get('/:table', db.getTable);

app.get('/:table/:id', db.getTableById);

app.post('/:table', db.postTable); 

app.put('/:table/:id', db.updateTable);

app.delete('/:table/:id', db.deleteTableByID);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


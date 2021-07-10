const bcrypt = require('bcrypt');
const express  = require('express'); 
const app = express();
const db = require('./queries.js');
const port = 3030;
const cors = require("cors");
const path = require('path');


const createHeader = async () => {
    return bcrypt.hash(Math.round(+Date.now() / 60000) * 60000), process.env.TOKEN_SALT
}

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:true}));

// app.get('/', (request, response) => {
//     response.json({ info: 'Thanks for connecting to our API' })
// });

// app.get('/favico.ico', (req, res) => {
//     res.sendStatus(404);
// });

app.use('/api',(r,R,n)=>{
    app.get('/api/:table', db.getTable);

    app.get('/api/:table/:id', db.getTableById);

    app.post('/api/:table', db.postTable); 

    app.put('/api/:table/:id', db.updateTable);

    app.delete('/api/:table/:id', db.deleteTableByID);
    n();
});

app.use(express.static(path.join(__dirname,'..','client','build')));

app.get(/^(?!\/api.*).*$/, function(req, res) {
    res.sendFile(path.join(__dirname,'..','client','build','index.html'));
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


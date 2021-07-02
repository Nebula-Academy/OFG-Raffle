const express  = require('express'); 
const app = express();
const db = require('./queries.js');
const port = 3030;
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.get('/', (request, response) => {
    response.json({ info: 'Thanks for connecting to our API' })
});

app.post('/create-member', db.createMember);

app.get('/:table', db.getTable);

app.get('/:table/:id', db.getTableById);

app.post('/:table', db.postTable); 

app.put('/:table/:id', db.updateTable);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


const express  = require('express'); 
const app = express();
const db = require('./queries.js');
const port = 3030;
const bodyparser = require("body-parser");
const cors = require("cors");

app.use(cors());

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({
    extended: true
}));

app.get('/', (request, response) => {
    response.json({ info: 'Thanks for connecting to our API' })
});

app.get('/:table', db.getTable);

app.post('/:table', db.postTable); 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
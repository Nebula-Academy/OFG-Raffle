const bcrypt = require('bcrypt');
const express  = require('express'); 
const app = express();
const db = require('./queries.js');
const port = process.env.PORT || 3030;
const cors = require("cors");
const path = require('path');

const createHeader = async () => {
    return bcrypt.hash(Math.round(+Date.now() / 60000) * 60000), process.env.TOKEN_SALT;
}

const {createProxyMiddleware} = require('http-proxy-middleware');

app.use(cors());

app.use('/api/square/*',createProxyMiddleware({
    target:'https://connect.squareup.com/v2/',
    changeOrigin:true,
    secure: true,
    pathRewrite: {'^/api/square' : ''},
    onProxyReq:proxy=>proxy.setHeader('Authorization',`Bearer ${process.env.BEARER_TOKEN}`) //abes production token for squarespace
}));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

// app.get('/', (request, response) => {
//     response.json({ info: 'Thanks for connecting to our API' })
// }); 

// app.get('/favico.ico', (req, res) => {
//     res.sendStatus(404);
// });

app.use('/api',(r,R,n)=>{
    console.log('api request');
    app.get('/api/:table', db.getTable);

    app.post('/api/create-member', db.createMember);

    app.get('/api/get-member/:username', db.getMember);

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


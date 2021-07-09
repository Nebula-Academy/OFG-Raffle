const express  = require('express'); 
const app = express();
const db = require('./queries.js');
const port = 3030;
const cors = require("cors");
const {createProxyMiddleware} = require('http-proxy-middleware');

app.use(cors());

app.use('/api/square/*',createProxyMiddleware({
    target:'https://connect.squareup.com/v2/',
    changeOrigin:true,
    secure: true,
    pathRewrite: {'^/api/square' : ''},
    onProxyReq:proxy=>proxy.setHeader('Authorization','Bearer EAAAEDrc4qrnLqenokc__FaUzAsr-qZoxYN9sTaP1Wzky2t-p8CRTQz6wnakhqwt')
    // onProxyReq:proxy=>proxy.setHeader('Authorization','Bearer EAAAEfuwJ3YKczDlhmGV7o19lPKY76t-WcBtbArIwl_JUjewBUxF2AvtGEx29ixc')
}))

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


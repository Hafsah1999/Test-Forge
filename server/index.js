const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const userRouter = require('./Routers/userRouter');
const utilRouter = require('./Routers/utils');
const testRouter = require('./Routers/testRouter');
const formRouter = require('./Routers/formRouter');


// middleware
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

app.use( '/test', testRouter );
app.use( '/user', userRouter );
app.use( '/form', formRouter );
app.use( '/util', utilRouter );

app.use( express.static('./static/uploads') );


app.listen( port, () => { console.log('server started'); } );
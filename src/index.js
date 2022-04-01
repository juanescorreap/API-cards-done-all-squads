const express = require('express');
const morgan = require('morgan');
const app = express();
var publicdir = __dirname + '/';

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static(publicdir,{extensions:['json']})); //or ,{index:false, extensions:['json']}

//routes
app.use(require('./routes/index.js'))
// starting server
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`)
})
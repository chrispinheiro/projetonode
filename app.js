const express = require('express');
const mustache = require('mustache-express');
const router = require('./routes/index.js')
const helpers = require('./helpers');
const errorHandler = require('./handlers/errorHandle');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');

//Configurações
const app = express();

app.use(express.json()); //express: organiza para que POST responda como GET, através de objeto/JSON
app.use(express.urlencoded({extended:true})); //necessário ativar para retornar os dados 

app.use(cookieParser(process.env.SECRET)); //chave secreta
app.use(session({
    secret:process.env.SECRET,
    resave:false, //não precisa salvar a sessão caso não tenha sido modificado
    saveUninitialized:false //não salva caso não exista dados
}));
app.use(flash());


app.use((req, res, next)=>{
    res.locals.h = helpers;
    //res.locals.teste = "123"; 
    res.locals.flashes = req.flash();
    next();
});

app.use('/', router);
//app.use('/painel', adminRouter);

// // comentario adicionado para tentar resolver post unico

app.engine('mst', mustache(__dirname+'/views/partials','.mst'));
app.set('view engine','mst');
app.set('views',__dirname+'/views');

module.exports = app;
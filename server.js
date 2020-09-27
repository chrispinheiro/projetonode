
const mongoose = require('mongoose');

require('dotenv').config({path:'variables.env'});

//Conexão ao Banco de Dados
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error)=>{
    console.error("Error: "+error.message);
});
// Carrega todos os Models
require('./models/Post');

//Carrega a aplicação
const { listen } = require('./app');
const app = require('./app');

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), ()=> {
    console.log("Servidor rodando na porta: "+server.address().port);
});


const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('./config/db'); 
const bookRoutes = require('./routes/bookRoutes'); 

app.use(bodyParser.urlencoded({ extended: true })); 
app.set('view engine', 'ejs'); //permite recibir datos

app.use('/', bookRoutes); 

app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
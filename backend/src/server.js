const express  = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const server = express();


server.use(cors());
server.use(express.json());

mongoose.connect('mongodb+srv://pedro:grilo@cluster0-nxp8j.mongodb.net/tindev?retryWrites=true&w=majority',{
    useNewUrlParser:true
});
server.use(routes);
server.listen(80); 
const express = require("express");
const bodyParser = require("body-parser");
const roteador = require("./rotas");


const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(roteador);


app.listen(8000);
const express = require('express');
const session = require('express- session');
const config= require ('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;


const exphbs = require('express-handlebars');


app.use(session(config.expressSesssionConfig));
app.use(express.json());
app.use(express.urlencoded({extended: true}));



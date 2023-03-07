require('dotenv').config();
const Sequelize = require('sequelize');
const express = require('express');

// 



const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = process.env.JAWSDB_URL
    ? new Sequelize(process.env.JAWSDB_URL)
    : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql',
        
    });


const expressSessionConfig = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    })
}
    module.exports = sequelize;


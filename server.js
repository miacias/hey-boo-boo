// express.js
const express = require('express');
const session = require('express-session');
const config = require("./config/connection.js");

// express routes
const path = require('path'); 
const router = require('./controllers');

// handlebars.js
const exphbs = require('express-handlebars');
// const helpers = require('./utils/helpers');

// environment variables
require('dotenv').config();

// sequelize
const sequelize = require('./config/connection.js');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;
// enables Handlebars helpers
const hbs = exphbs.create(/*{ helpers }*/);

app.use(session(config.sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(router);

config.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(` Now Listening on port ${PORT}`));
});
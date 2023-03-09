const path = require("path");
const express = require("express");
require("dotenv").config();

// import express session and store sequelize connection to new class type
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// express session and handlebars
const exphbs = require("express-handlebars");

const router = require("./controllers");
const config = require("./config/connection");
// const helpers = require('./utils/helpers';)

const app = express();
const hbs = exphbs.create();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(router);
app.use(session(config.sess));
app.use(express.static(path.join(__dirname, "public")));

config.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(` Now Listening on port ${PORT}`));
});
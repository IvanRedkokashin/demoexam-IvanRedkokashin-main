const express = require('express');
const app = express();
const ejs = require("ejs");
const fs = require("fs");
const session = require("express-session");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const path = require("path");
const req = require('express/lib/request');
const rout = require("./router/index_router")
app.use(cookieParser());
app.set('view engine', 'ejs');

require('dotenv').config();
// const PORT = process.env.PORT;
const PORT = 3000;

const { sequelize } = require("./models/db");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(rout)

app.listen(PORT, async function(){
    await sequelize.sync();
    console.log("База данных sequelize синхронизирована");     
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
})
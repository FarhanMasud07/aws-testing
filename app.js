const express = require('express');
const bodyParser = require('body-parser');
const server = require('./src/server/server');
const UserLogin = require('./src/Api/Login/login');
const app = express();


app.use(express.urlencoded());

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());


//this is api calls
const login = new UserLogin(app);
login.signIn();
login.refreshToken();


// this is the server
const connection = new server(8081, app);
connection.core();

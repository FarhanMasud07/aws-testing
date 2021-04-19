const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const login = require('./src/Api/Login/login');


const app = express();
app.use(express.urlencoded());

const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());


//this is api call
app.post('/login', login.Login);
app.post('/refresh-token', login.RefreshToken);


// this is the server
mongoose
    .connect(`mongodb+srv://Farhan26:Sherlock1234@farhan01.yzaff.mongodb.net/graphql_node?retryWrites=true&w=majority`,
        {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(() => {
        app.listen(3000, (error) => {
            if (error) console.log(error);
            else console.log(`http://localhost:3000`);
        });
    })
    .catch(error => {
        console.log(error);
    });

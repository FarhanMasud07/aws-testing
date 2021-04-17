const express = require('express');
const mongoose = require('mongoose');
const bCryptJs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("./src/Models/user");
const bodyParser = require('body-parser');
const app = express();


app.use(express.urlencoded());

const cors = require('cors')

app.use(cors());
app.use(bodyParser.json());

app.get('/videos', (req, res, next) => {
    return res.json('Hello World');
});


app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const findUser = await User.findOne({email: email});
    if (!findUser) return res.status(404).send({message: 'Invalid Email'});
    const isEqualPassword = await bCryptJs.compare(password, findUser.password);
    if (!isEqualPassword) return res.status(404).send({message: 'Invalid password'});
    const user = {
        userId: findUser.id,
        email: findUser.email,
        roles: findUser.roles
    }
    const token = await jwt.sign(user, '01627715576', {expiresIn: '10s'});
    const refreshToken = await jwt.sign(user, '01627715575', {expiresIn: '1m'});

    res.json({jwt: token, refreshToken: refreshToken});
});


app.post('/refresh-token', async (req, res) => {
    const postData = req.body;
    if (postData.refreshToken) {
        let decodeRefreshToken
        try {
            decodeRefreshToken = jwt.verify(postData.refreshToken, '01627715575');
        } catch (e) {
            return res.sendStatus(401);
        }
        if (!decodeRefreshToken) return res.sendStatus(401)
        const findUser = await User.findOne({_id: decodeRefreshToken.userId});
        if (!findUser) return res.sendStatus(401);
        const user = {
            userId: findUser.id,
            email: findUser.email,
            roles: findUser.roles
        }
        const token = await jwt.sign(user, '01627715576', {expiresIn: '10s'});

        res.json({jwt: token});
    } else {
        res.sendStatus(401);
    }
});


mongoose.connect(`mongodb+srv://Farhan26:Sherlock1234@farhan01.yzaff.mongodb.net/graphql_node?retryWrites=true&w=majority`,
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

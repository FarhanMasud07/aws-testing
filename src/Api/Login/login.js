const bCryptJs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../../Models/user");


class Login {
    app;

    constructor(app) {
        this.app = app;
    }

    signIn() {
        this.app.post('/login', async (req, res) => {
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
    }

    refreshToken() {
        this.app.post('/refresh-token', async (req, res) => {
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
    }
}

module.exports = Login;

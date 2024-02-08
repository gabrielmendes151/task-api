const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const jwt = require('jsonwebtoken')
const JWT_SECRET = '9718fbc7adc56c4856f6d63bc948df0d6737993e4ad4ef730260111c3c777423';
let users = [];

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

app.post('/users', async (req, res) => {
    const {username, password} = req.body;

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({message: 'Username já está em uso'});
    }

    const hashedPassword = await hashPassword(password);

    const newUser = {
        id: users.length + 1,
        username: username,
        password: hashedPassword
    };

    users.push(newUser);
    res.status(201).json({message: 'Usuário criado com sucesso', user: newUser});
});

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = users.find(user => user.username === username);

    if (user) {
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            const token = jwt.sign(user, JWT_SECRET, {expiresIn: '1h'});
            res.json({token});
        } else {
            res.status(401).json({message: 'Credenciais inválidas'});
        }
    } else {
        res.status(401).json({message: 'Credenciais inválidas'});
    }
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = {
    app,
    authenticateToken
};
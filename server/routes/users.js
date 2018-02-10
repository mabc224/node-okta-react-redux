var express = require('express');
var router = express.Router();
const oktaClient = require('../config/oktaClient');

// Create a new User (register)
router.post('/', (req, res, next) => {
    if (!req.body) return res.sendStatus(400);
    console.log(JSON.stringify(req.body));
    const newUser = {
        profile: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            login: req.body.email
        },
        credentials: {
            password: {
                value: req.body.password
            }
        }
    };
    oktaClient.createUser(newUser)
        .then(user => {
            console.log(user);
            res.status(201);
            res.send(user);
        })
        .catch(err => {
            res.status(400);
            res.send(err);
        })
});

router.post('/change_password', (req, res, next) => {
    console.log(JSON.stringify(req.body));
    if (!req.body.newPassword && !req.body.oldPassword && !req.body.userId) return res.sendStatus(400);

    const password = {
        oldPassword: { value: req.body.oldPassword },
        newPassword: { value: req.body.newPassword }
    };
    const userId = req.body.userId;

    oktaClient.changePassword(userId, password)
        .then(pass => {
            console.log(pass);
            res.status(200);
            res.send(pass);
        })
        .catch(err => {
            res.status(400);
            res.send(err);
        })
});


module.exports = router;

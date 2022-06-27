const User = require('../models/user');

const generateToken = (req, res) => {
    const userid = req.query.userid;
    const role = req.query.role;
    const token = generateToken(userid, role)
    res.send(token);
    console.log(token);
}

const createUser = (req, res) => {
    const newUser = new User(req.body);
    newUser.save()
        .then(result => {
            res.send(result);
        }
        ).catch(err => {
            res.send(err);
        }
        );
}

module.exports = {
    generateToken,
    createUser
}
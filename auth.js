const jwt = require('jsonwebtoken');
const Admin = require('./models/admin');
require('dotenv').config();

const auth = (req, res, next) => {

    const {token} = req.session;

    const {auth, check} = req.body;

    if (auth && !token) return res.status(204).send();
    if (!token) return res.status(403).send();

    jwt.verify(token, process.env.TOKEN, (err, decoded) => {
        
        if (err) return res.status(500).send();

        Admin.findById(decoded.id).exec((err,doc)=>{
            if (err) return res.status(500).send();
            if (check) return res.status(200).send();
            next()
        })

    })
}

module.exports = auth
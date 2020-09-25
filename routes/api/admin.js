const Admin = require('../../models/admin');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/', (req,res) => {

    const {username, password} = req.body;

    if (!username || !password) return res.status(401).json({content:'no data provided', type:'bad'});

    Admin.findOne({username})
    .exec( async (err, docToCompare)=>{

        if (err) return res.status(500).json({content:'internal server error, please contact admin', type:'bad'});
        if (!docToCompare) return res.status(422).json({content:'wrong password or username', type:'bad'});

        const compared = await bcrypt.compare(password, docToCompare.password);

        if (!compared) return res.status(422).json({content:'wrong password or username', type:'bad'});

        Admin.findOne({password:docToCompare.password})
        .exec((error, user) => {

            if (error) return res.status(500).json({content:'internal server error, please contact admin', type:'bad'});
            
            const token = jwt.sign({id:user._id}, process.env.TOKEN, {algorithm:'HS256'})
            
            req.session.token = token;
            res.json(req.session);
        })
    })
})

module.exports = router;
const router = require('express').Router();
const Admin = require('../../models/admin');
const bcrypt = require('bcryptjs');
const auth = require('../../auth');

router.post('/', auth, async (req,res)=>{

    const {username, password} = req.body;

    if (!username || !password) return res.status(422).json({content:'no data provided', type:'bad'});

    const duplicated = Admin.findOne({username});

    if (duplicated) return res.status(422).json({content:'username is taken', type:'bad'});

    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt)

    await new Admin ({
        username,
        password:hash
    })
    .save((error)=>{
        if (error) res.status(500).json({content:'an error ocurred, please contact the admin', type:'bad'})
        res.status(200).json({content:'user created successfully', type:'good'})
    })
    
})

module.exports = router;
const router = require('express').Router();
const auth = require('../../auth');

router.get('/', auth, (req, res)=>{
    req.session.destroy((err)=>{
        console.log(err)
        res.status(200).send()
    });
})

module.exports = router;
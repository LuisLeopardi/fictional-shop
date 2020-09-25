const router = require('express').Router();
const {Battery, Phone, Accessory} = require('../../models/item')

router.post('/', async (req,res)=>{
    
    const {id, db} = req.body;

    console.log(id,db)

    if (!id || !db) return res.status(400).send();

    let Item;

    switch(db){
        case('Battery'):
        Item = Battery
        break;
        case('Phone'):
        Item = Phone
        break;
        case('Accessory'):
        Item = Accessory
        break;
    }

    if (!Item) return res.status(400).send();

    const query = await Item.findById({_id:id});

    const data = {
        model:query.model,
        price:query.price,
        description:query.description,
        image:query.image
    }
    
    res.json(data)

});

module.exports = router;
const router = require('express').Router();
const {Battery, Phone, Accessory} = require('../../models/item');

router.post('/', async (req,res)=>{

    const {db} = req.body;

    if (!db) return res.status(422).json({content:'no data provided', type:'bad'});

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

    if (!Item) return res.status(422).json({content:'item is undefined', type:'bad'});
    
    const itemsArray = await Item.find({})

    const itemData = itemsArray.map(e=>{
        const itemsStructure = {
            id:e._id,
            model:e.model,
            price:e.price,
            description:e.description,
            image: e.image,
            db:db
        }
        return itemsStructure;
    });

    res.status(200).json(itemData)
});

module.exports = router;
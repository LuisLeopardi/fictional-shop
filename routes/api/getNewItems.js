const router = require('express').Router();
const {Battery, Phone, Accessory} = require('../../models/item');

router.get('/', async (req,res)=>{
    
    const batteryArray = await Battery.find().limit(8)
    const accessoryArray = await Accessory.find().limit(8)
    const phoneArray = await Phone.find().limit(8)

    const batteryData = batteryArray.map(e=>{
        const batteryStructure = {
            id:e._id,
            model:e.model,
            price:e.price,
            description:e.description,
            image: e.image,
            db:'Battery'
        }
        return batteryStructure;
    });
    const accessoryData = accessoryArray.map(e=>{
        const accessoryStructure = {
            id:e._id,
            model:e.model,
            price:e.price,
            description:e.description,
            image: e.image,
            db:'Accessory'
        }
        return accessoryStructure;
    });
    const phoneData = phoneArray.map(e=>{
        const phoneStructure = {
            id:e._id,
            model:e.model,
            price:e.price,
            description:e.description,
            image: e.image,
            db:'Phone'
        }
        return phoneStructure;
    });
    res.status(200).json({batteryData,accessoryData,phoneData})
});

module.exports = router;
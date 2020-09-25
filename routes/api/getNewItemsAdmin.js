const router = require('express').Router();
const {Battery, Phone, Accessory} = require('../../models/item');
const auth = require('../../auth')

router.get('/', auth, async (req,res)=>{
    
    const batteryArray = await (await Battery.find({}));
    const accessoryArray = await (await Accessory.find({}));
    const phoneArray = await (await Phone.find({}));

    const batteryData = batteryArray.map(e=>{
        const batteryStructure = {
            id:e._id,
            model:e.model,
            price:e.price,
            description:e.description,
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
            db:'Phone'
        }
        return phoneStructure;
    });
    res.json({batteryData,accessoryData,phoneData})
});

module.exports = router;
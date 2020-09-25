const router = require('express').Router();
const {Battery, Phone, Accessory} = require('../../models/item');

router.get('/', async (req,res)=>{
    
    const batteryArray = await (await Battery.find({})).splice(0,8);
    const accessoryArray = await (await Accessory.find({})).splice(0,8);
    const phoneArray = await (await Phone.find({})).splice(0,8);

    const batteryData = batteryArray.map(e=>{
        const batteryStructure = {
            id:e._id,
            model:e.model,
            price:e.price,
            description:e.description,
            image: e.image
        }
        return batteryStructure;
    });
    const accessoryData = accessoryArray.map(e=>{
        const accessoryStructure = {
            id:e._id,
            model:e.model,
            price:e.price,
            description:e.description,
            image: e.image
        }
        return accessoryStructure;
    });
    const phoneData = phoneArray.map(e=>{
        const phoneStructure = {
            id:e._id,
            model:e.model,
            price:e.price,
            description:e.description,
            image: e.image
        }
        return phoneStructure;
    });
    res.json({batteryData,accessoryData,phoneData})
});

module.exports = router;
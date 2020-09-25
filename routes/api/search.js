const router = require('express').Router();
const {Battery, Phone, Accessory} = require('../../models/item');

router.post('/', async (req,res)=>{

    let result;

    const {query, collection} = req.body;
    if (!query || !collection) return res.status(400).json({type:'bad', content:'no parameters'});
    const queryArray = [...new Set(query.toLowerCase().trim().split(' '))];  

        let Model;

        switch (collection) {
            case('batteries'):
                Model = Battery;
            break;
            case('phones'):
                Model = Phone;
            break;
            case('accessories'):
                Model = Accessory;
            break;
        }

        if (!Model) return res.status(422).json({content:'model is undefined', type:'bad'});

        result = await (await Model.find()).filter(doc=>{
            const docModelArray = [...new Set(doc.model.toLowerCase().trim().split(' '))];
            const filtered = docModelArray.filter(docWord =>
                queryArray.every(queryWords => queryWords === docWord)
            )  
            return filtered;
        })
        res.status(200).json({result});
    
})

module.exports = router
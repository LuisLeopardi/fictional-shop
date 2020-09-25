const router = require('express').Router();
const auth = require('../../auth');
const {Battery, Phone, Accessory} = require('../../models/item');


router.post('/', auth, async (req, res) => {

const {id, db} = req.body;

if (!id || !db) return res.status(422).json({content:'no data provided', type:'bad'})

let Item;
if( db==='Battery' ) {
  Item = Battery;
} else if ( db==='Accessory' ) {
  Item = Accessory;
} else if ( db==='Phone' ) {
  Item = Phone;
}

Item.findByIdAndDelete({_id:id})
.then(()=>{
    res.status(200).send()
  })
  .catch(e=>{
    console.log(e)
    res.status(500).json({type:'bad', content:'server error'})
  })

})

module.exports = router
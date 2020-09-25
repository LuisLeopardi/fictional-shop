const router = require('express').Router();
const multer = require('multer');
const joi = require('joi');
const auth = require('../../auth');
const {Battery, Phone, Accessory} = require('../../models/item');

const storage = multer.memoryStorage();
const upload = multer({ storage });
const schema = joi.object({
  model: joi.string(),
  price: joi.number,
  stock: joi.number(),
  description: joi.string(),
  db: joi.string(),
  id: joi.string()
})

router.post('/', auth, upload.single('file'), async (req, res) => {

  const {id, db, ...data} = req.body;
  const validate = schema.validate(data);
  let dataWithFile;
  if (req.file) {
    if (req.file.mimetype !== 'image/jpeg') return res.status(422).json({type:'bad', content:'image is not jpeg'});
    dataWithFile = {...data, image:req.file.buffer}
  } 

  if (validate.error) return res.status(422).json({type:'bad', content:validate.error.details[0].message});

 let Item;
 if( db==='Battery' ) {
   Item = Battery;
 } else if ( db==='Accessory' ) {
   Item = Accessory;
 } else if ( db==='Phone' ) {
   Item = Phone;
 }

  Item.findByIdAndUpdate({_id:id}, dataWithFile || data)
  .then(()=>{
    res.status(200).send()
  })
  .catch(e=>{
    console.log(e)
    res.status(500).json({type:'bad', content:'server error'})
  })

})

module.exports = router
const router = require('express').Router();
const multer = require('multer');
const joi = require('joi');
const auth = require('../../auth');
const {Battery, Phone, Accessory} = require('../../models/item');
require('dotenv').config();

const storage = multer.memoryStorage();
const upload = multer({ storage });
const schema = joi.object({
  model: joi.string().required(),
  price: joi.number().required(),
  stock: joi.number().required(),
  description: joi.string().required(),
  selected: joi.string().required(),
})

router.post('/', auth, upload.single('file'), async (req, res) => {

  const {mimetype,  size} = req.file;
  const {model,description,price,stock,selected} = req.body;

  const validate = schema.validate({model,description,price,stock,selected});

  console.log(req.file)

  if (mimetype !== 'image/jpeg') return res.status(422).json({type:'bad', content:'image is not jpeg'});
  if (size > 1000000) return res.status(422).json({type:'bad', content:'image cannot be bigger than 1 MB'});
  if (!model || !description || !price || !stock) return res.status(422).json({type:'bad', content:'fill the form please'});
  if (isNaN(Number(price)) || isNaN(Number(stock))) return res.status(422).json({type:'bad', content:'stock and price fields must be numbers'});
  if (validate.error) return res.status(422).json({type:'bad', content:validate.error.details[0].message});

  let Item;
  if(selected==='Battery') {
    Item = Battery;
  } else if (selected==='Accessory') {
    Item = Accessory;
  } else if (selected==='Phone') {
    Item = Phone;
  }

  await new Item ({
    model,
    price,
    stock,
    description,
    image: req.file.buffer,
    is:selected
  })
  .save()
  .then(()=>{
    res.json({type:'good', content:'upload successful'})
  })
  .catch(e=>{
    console.log(e)
    res.json({type:'bad', content:'error'})
  })

})

module.exports = router
const express = require('express')
const Apartment = require('../models/apartment');
const auth = require('../middlewares/userAuth')
const multer = require('multer')
const router = express.Router()

var storage =  multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, 'images/apartment')
  },
  filename: (req, file, cb)=>{
    cb(null, file.fieldname + '-'+Date.now()+ '.jpg')
  }
});
var upload = multer({

  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Please upload an image'))
    }

    cb(undefined, true)
  },
  storage: storage,
  
});
//Apartment Registration 
router.post('/apartment',  upload.single('image'), auth, async(req, res)=>{
  let apartment
  if(req.file){
      apartment = new Apartment({
      ...req.body,
      image: req.file.path
        })
  }else{
      apartment = new Apartment({
      ...req.body,
    
    })
  }
  try{
    await apartment.save()
    res.status(200).send({msg : 'Successfully Submitted', apartment})
  }catch(e){
    res.status(400).send(e.message)
  }
})

// Fetch all apartment
router.get('/apartment', async(req, res)=>{
  try{
    const apartments = await Apartment.find()
    res.status(200).send(apartments)
  }catch(e){
    res.status(400).send(e)
  }
})


//Apartment Deletion
router.post('/apartment/del/:id', auth, async(req, res)=>{
  try{
    await Apartment.findByIdAndDelete(req.params.id)
    res.status(200).send({msg : 'Successfully Deleted'})
  }catch(e){
    res.status(400).send(e)
  }
})


//Apartment Modification By id
router.patch('/apartment/edit/:id', auth, async(req, res)=>{

  const updates = Object.keys(req.body)
  const allowedUpdates = ['apartNo', 'apartName', 'floorNo', 'buildingName', 'available']

  const isValidOperation = updates.every((update)=> allowedUpdates.includes(update) )
  if(!isValidOperation){
   res.send(404).send({error: 'Invalid updates'})
  }

  try{
    const apartment =await Apartment.findByIdAndUpdate({_id: req.params.id}, req.body)
    res.status(200).send({apartment , msg : 'Successfully Modified'})
  }catch(e){
    res.status(400).send(e.message)
  }

})

module.exports = router;
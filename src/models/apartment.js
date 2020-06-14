const mongoose = require('mongoose')

const apartmentSchema  = mongoose.Schema({
  image: {
    type: String,
  },
  apartNo : {
    type: Number,
    required: [true, "Apartment number is required" ],
    unique: true,
    min: [1, "Appartment number must not be less than 1" ]
  },
  apartName : {
    type: String,
    required: [true, "Apartment name is required" ],
    trim : true,
    
  },
  floorNo : {
    type: Number,
    required: [true, "Floor number is required" ],
    trim : true,
    min: [1, "Floor number must not be less than 1" ]
  },
  buildingName : {
    type: String,
    required: [true, "Building name is required" ],
    trim : true
  },
  available: {
    type: Boolean,
    required: true
  }
 
})

const Apartment = mongoose.model('Apartment', apartmentSchema)
module.exports = Apartment;
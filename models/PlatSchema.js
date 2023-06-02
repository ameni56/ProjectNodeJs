const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlatSchema = new Schema({
    plat_name: {
        required: true,
        type: String,
        unique: true
       
    },
    price:{
        type: Number,
        required: true,

    },
    nbre_ingredients:{
        type: Number,
        

    },
   description: {
        required: true,
        type: String,
      
    },
    plat_image: {
       
        type: String,
        
    }
});

const Plat = mongoose.model('Plat', PlatSchema);

module.exports =Plat;
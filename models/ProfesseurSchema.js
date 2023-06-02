const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProfesseurSchema = new Schema({
    fullname: {
        required: true,
        type: String,
       
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    telephone: {
        type: Number,
        
    }
});

const Professeur = mongoose.model('Professeur', ProfesseurSchema);

module.exports = Professeur;
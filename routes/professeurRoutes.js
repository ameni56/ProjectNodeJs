const express = require('express');
const router = express.Router();

const { createProfesseur, getProfesseurs,editProfesseur,updateProfesseur,deleteProfesseur, rechercherProfesseur} = require('../controllers/professeurController');
const validation = require('../middlewares/validation');
router.post('/Professeur', validation, createProfesseur);
router.get('/Professeur/Liste', getProfesseurs);
router.get('/Professeur/EditProfesseur/:id', editProfesseur);
router.post('/Professeur/EditProfesseur/:id', validation,updateProfesseur);
router.get('/Professeur/DeleteProfesseur/:id', deleteProfesseur)
// Recherche de professeurs par e-mail(twig)
router.get('/professeurs/rechercher', rechercherProfesseur);



module.exports = router;
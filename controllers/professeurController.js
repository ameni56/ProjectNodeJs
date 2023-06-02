const Professeur= require('../models/ProfesseurSchema')



const createProfesseur = async (req, res) => {
    try {
        const { fullname, email,telephone } = req.body;
        let professeur = new Professeur({ fullname, email,telephone  });
        await professeur.save();
        // Redirection vers la liste des professeurs
        //  res.redirect('/Professeur/Liste');
    } catch (error) {
        return res.status(500).json({ error });
    }
}
const getProfesseurs = async (req, res) => {
    try {
      const professeurs = await Professeur.find({});
      res.render('listProfesseur', { professeurs }); // Rendre la vue avec les données des messages
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  const updateProfesseur = async (req, res) => {
    const { id } = req.params;
    const {fullname, email,telephone  } = req.body;
    await Professeur.findByIdAndUpdate(id, { fullname, email,telephone });
    res.redirect('/Professeur/Liste');
  };
  
  const editProfesseur = async (req, res) => {
    const { id } = req.params;
    const professeur = await Professeur.findById(id);
    res.render('editProfesseur.twig', { professeur});
  };
  
   const deleteProfesseur = async (req, res) => {
     const { id } = req.params;
     await Professeur.findByIdAndDelete(id);
     res.redirect('/Professeur/Liste');
   }

  // Recherche de professeurs par e-mail
const rechercherProfesseur = async (req, res) => {
    const { email } = req.query;
  
    try {
      const professeurs = await Professeur.find({ email });
  
      res.render('listProfesseur', {
        professeurs,
        searchEmail: email
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  //recherche par email par postman
  // async function rechercherProfesseurByEmail(req, res) {
  //   try {
  //     const { email } = req.query;
  
  //     const professors = await Professeur.find({ email });
  
  //     res.json(professors);
  //   } catch (error) {
  //     res.status(500).json({ error: 'An error occurred while searching for professors.' });
  //   }
  // }

  
  //this delete is with socket=>une notification sera affiché lors de delete
  // const deleteProfesseur = async (req, res) => {
  //   const { id } = req.params;
  //   try {
  //     const deletedProfesseur = await Professeur.findByIdAndDelete(id);
  //     if (deletedProfesseur) {
  //       io.emit("professeurDeleted", { id: deletedProfesseur._id });
  //       res.redirect('/Professeur/Liste');
  //     } else {
  //       res.status(404).json({ error: "Professor not found" });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ error });
  //   }
  // };
  

  





module.exports = {  createProfesseur,getProfesseurs,updateProfesseur,editProfesseur,deleteProfesseur,rechercherProfesseur };
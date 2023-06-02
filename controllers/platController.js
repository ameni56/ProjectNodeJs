const Plat= require('../models/platSchema')



const createPlat = async (req, res) => {
    try {
        const { plat_name,price,nbre_ingredients,description,plat_image } = req.body;
        let plat = new Plat({plat_name,price,nbre_ingredients,description,plat_image});
        await plat.save();
        // Redirection vers la liste des Plat
        //  res.redirect('/Plat/Liste');
        res.status(200).json({ message: 'Plat created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = {createPlat}
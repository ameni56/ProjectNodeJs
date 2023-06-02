const yup = require("yup");

const validation = async (req, res, next) => {
  try {
    const { fullname, email, telephone } = req.body;

    // Define the validation schema using Yup
    const professeurSchema = yup.object().shape({
      fullname: yup.string().max(8, "Le champ fullName ne doit pas dépasser 8 caractères."),
      email: yup.string().email("Le champ email doit être de type email."),
      telephone: yup.number().integer("Le champ telephone doit être de type Number.").max(99999999, "Le champ telephone ne doit pas dépasser 8 chiffres."),
    });

    // Validate the input data against the schema
    await professeurSchema.validate({
      fullname,
      email,
      telephone,
    });

    // If the validation is successful, proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = validation;

const yup = require('yup');

const validationPlat = yup.object().shape({
  plat_name: yup.string().max(8).required().strict().trim().lowercase(),
  nbre_ingredients: yup
    .number()
    .positive()
    .max(5)
    .required()
    .integer()
    .typeError('nbre_ingredients must be a positive number not exceeding 5'),
  description: yup
    .string()
    .matches(/^[a-zA-Z\s]*$/, 'Description can only contain letters')
    .required(),
});

module.exports = validationPlat;

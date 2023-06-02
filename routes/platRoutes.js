const express = require('express');
const router = express.Router();

const { createPlat} = require('../controllers/platController');
const validationPlat = require('../middlewares/validationPlat');
const upload = require('../middlewares/imageUpload');

router.post('/Plat', upload, createPlat);

module.exports = router;

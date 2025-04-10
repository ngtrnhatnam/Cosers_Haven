const express = require('express');
const router = express.Router();
const costumeController = require('../controllers/costumes');
const Costume = require('../models/costume');
const filterDeleted = require('../middlewares/filterDeleted');

router.get('/', filterDeleted(Costume), costumeController.getAllCostumes);
router.get('/all', costumeController.getAllCostumes);
router.get('/search', costumeController.searchCostumes);
router.get('/:id', costumeController.getCostumeById)
router.post('/', costumeController.createCostume);
router.put('/:id', costumeController.updateCostume);  
router.delete('/:id', costumeController.deleteCostume);

module.exports = router;
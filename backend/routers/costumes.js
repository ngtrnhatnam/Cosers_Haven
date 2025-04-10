const express = require('express');
const router = express.Router();
const costumeController = require('../controllers/costumes');
const Costume = require('../models/costume');
const filterDeleted = require('../middlewares/filterDeleted');

router.get('/', filterDeleted(Costume), costumeController.getAllCostumes);
router.get('/all', costumeController.getAllCostumes);
router.get('/search', costumeController.searchCostumes);
<<<<<<< HEAD:backend/routers/costumes.js
router.get('/:id', costumeController.getCostumeByIdOrSlug);
=======
router.get('/:id', costumeController.getCostumeById)
>>>>>>> b72e69ef11034dde096e0834091b70d8760acec3:routers/costumes.js
router.post('/', costumeController.createCostume);
router.put('/:id', costumeController.updateCostume);  
router.delete('/:id', costumeController.deleteCostume);

<<<<<<< HEAD:backend/routers/costumes.js
module.exports = router; 
=======
module.exports = router;
>>>>>>> b72e69ef11034dde096e0834091b70d8760acec3:routers/costumes.js

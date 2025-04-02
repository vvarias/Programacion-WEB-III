const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController'); 

router.get('/', bookController.list); 
router.post('/create', bookController.create); 
router.post('/update/:id', bookController.update);
router.get('/delete/:id', bookController.delete); 

module.exports = router;
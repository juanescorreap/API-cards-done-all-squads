const {Router} = require('express');
const data = require('../controllers/cards');
const router = Router();


router.get('/', async(req, res) =>{
    
    res.json((await data))
})

module.exports = router;
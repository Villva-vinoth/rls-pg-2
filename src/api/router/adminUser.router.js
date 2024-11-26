const { createUser, getOne, login, getAll } = require('../controller/adminUser.controller')

const router = require('express').Router()


router.post('/create',createUser);
router.get('/getOne/:id',getOne);
router.get('/getAll',getAll);


module.exports = router
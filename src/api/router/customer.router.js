const { createCustomer, getOne, getAll } = require('../controller/customer.controller')

const router = require('express').Router()

router.post('/create',createCustomer)
router.get('/getOne/:id',getOne)
router.get('/getAll',getAll);

module.exports = router
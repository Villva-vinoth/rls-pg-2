const {  login, createUser } = require('../controller/adminUser.controller');
const router = require('express').Router()

router.post('/register',createUser);
router.post('/login',login);

module.exports = router
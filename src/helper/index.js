const router = require('express').Router()
const adminUserRouter = require('../api/router/adminUser.router')
const authRouter = require('../api/router/auth.router');
const {setTenantId} = require('./setTenantId');
const customerRouter = require('../api/router/customer.router')

router.use('/users',setTenantId,adminUserRouter);
router.use('/auth',authRouter);
router.use('/customers',setTenantId,customerRouter);



module.exports = router
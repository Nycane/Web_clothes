const router = require('express').Router();
const orderController = require('../controllers/orderController')
const auth = require('../middleware/authToken')

router.get('/detail',auth.verifyToken,orderController.getOrderDetail)
router.post('/add',auth.verifyToken,orderController.addOrder)
router.get('/vnpay_return',auth.verifyToken,orderController.vnp_return)
router.get('/vnpay_ipn',auth.verifyToken,orderController.vnp_ipn)
router.post('/create_payment',auth.verifyToken,orderController.vnp_create)
router.get('/detail/:id',auth.verifyToken,orderController.getOrderDetailById)
router.get('/:id',auth.verifyToken,orderController.getOrderById)

module.exports = router
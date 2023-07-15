const router = require('express').Router();
const userController = require('../controllers/userController')
const auth = require('../middleware/authToken')
router.delete('/logout/:id',userController.logout)
router.post('/comment',auth.verifyToken,userController.commentUser)
router.post('/changepassword',auth.verifyToken,userController.changePassword)
router.post('/refreshtoken',userController.RefreshToken)
router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/update',auth.verifyToken,userController.updateUser)
router.get('/comment/:id',userController.getCommentUser)
router.delete('/comment/delete/:id',auth.verifyToken,userController.deleteCommentUser)
router.get('/',auth.verifyToken,userController.getAllUser)
module.exports = router
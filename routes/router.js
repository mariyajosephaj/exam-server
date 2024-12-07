const express = require ('express')
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

// object creation for router class
const router = new express.Router()
// register
router.post('/register',userController.registerController)

// login
router.post('/login',userController.loginController)

// get users

router.get('/view',jwtMiddleware,userController.getUserController)
module.exports = router


module.exports=router
import express from 'express'
import UsersController from "../controllers/userController.js"
const router = express.Router()

const usersController = new UsersController()
router.get('/', usersController.getUsers)
router.get('/:id', usersController.getUserById)
router.post('/', usersController.createUser)
router.put('/:id', usersController.updateUser)
router.delete('/:id', usersController.deleteUser)

export default router
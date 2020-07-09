import express from 'express'
import AuthController from './app/controllers/AuthController'
import CotaController from './app/controllers/CotaController'
import authMiddleware from './app/middlewares/auth'

const routes = express.Router()

const authController = new AuthController()
const cotaController = new CotaController()

// Alteracao
routes.post('/cadastrar', authController.create)
routes.post('/autenticar', authController.authentication)
routes.post('/senha-esquecida', authController.forgotPassword)
routes.post('/recuperar-senha', authController.resetPassword)

routes.get('/', authMiddleware, cotaController.index)
routes.get('/:cotaId', authMiddleware, cotaController.show)
routes.post('/', authMiddleware, cotaController.create)
routes.put('/:cotaId', authMiddleware, cotaController.update)
routes.delete('/:cotaId', authMiddleware, cotaController.delete)

export default routes

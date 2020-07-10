import express from 'express'
import AuthController from './app/controllers/AuthController'
import ImovelController from './app/controllers/ImovelController'
import authMiddleware from './app/middlewares/auth'

const routes = express.Router()

const authController = new AuthController()
const imovelController = new ImovelController()

// Alteracao
routes.post('/cadastrar', authController.create)
routes.post('/autenticar', authController.authentication)
routes.post('/senha-esquecida', authController.forgotPassword)
routes.post('/recuperar-senha', authController.resetPassword)

routes.get('/imoveis', authMiddleware, imovelController.index)
routes.get('/:imovelId', authMiddleware, imovelController.show)
routes.post('/cadastrarimovel', authMiddleware, imovelController.create)
routes.put('/:imovelId', authMiddleware, imovelController.update)
routes.delete('/:imovelId', authMiddleware, imovelController.delete)

export default routes

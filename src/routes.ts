import express from 'express'
import UserController from './app/controllers/UserController'
import ImovelController from './app/controllers/ImovelController'
import authMiddleware from './app/middlewares/auth'

const routes = express.Router()

const userController = new UserController()
const imovelController = new ImovelController()

// Endpoints dos usuários
routes.post('/signup', userController.create)
routes.post('/login', userController.authentication)
routes.post('/login/restore', userController.forgotPassword)
routes.post('/reset/password', userController.resetPassword)

// Endpoints dos imóveis
routes.get('/pesquisar/imoveis', authMiddleware, imovelController.index)
routes.get('/pesquisar/imovel/:imovelId', authMiddleware, imovelController.show)
routes.post('/cadastrar/imovel', authMiddleware, imovelController.create)
routes.put('/alterar/imovel/:imovelId', authMiddleware, imovelController.update)
routes.delete('/deletar/imovel/:imovelId', authMiddleware, imovelController.delete)

export default routes

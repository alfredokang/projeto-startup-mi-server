import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './routes'

const PORT = process.env.PORT || 3333

// Inicializando o express
const app = express()

// Configurações
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.json())
app.set('PORT', PORT)
app.use(routes)

// Erro para rota não encontrada
app.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
  const error: any = new Error('Route not Found')
  error.status = 404
  next(error)
})

// Erro para todos os catch
app.use((error: any, request: express.Request, response: express.Response, next: express.NextFunction) => {
  response.status(error.status || 500)
  response.json({ error: error.message })
})

app.listen(PORT, () => console.log('\x1b[36m%s\x1b[0m', `-> Server running on port ${PORT}`))

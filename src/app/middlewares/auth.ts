import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth.json'

export default function auth (request: any, response: any, next: any) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).send({ error: 'No token provided' })
  }

  const parts: string = authHeader.split(' ')
  // Vamos verificar se o nosso token tem duas partes Bearer e a outra parte
  if (String(!parts).length === 2) {
    return response.status(401).send({ error: 'Token error' })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).send({ error: 'Token malformatted' })
  }

  jwt.verify(token, authConfig.secret, (error, decoded: any) => {
    if (error) {
      return response.status(401).send({ error: 'Token Invalid!' })
    }
    request.userId = decoded.id
    return next()
  })
}

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import User from '../models/users'
import 'dotenv/config'
import mailer from '../../modules/mailer'

class AuthController {
  // Gerando o token de segurança
  static generateToken (params = {}) {
    return jwt.sign(params, process.env.SECRET, {
      expiresIn: 86400
    })
  }

  public async create (request: any, response: any) {
    const { email } = request.body
    try {
      if (await User.findOne({ email })) {
        return response.status(400).send({ error: 'Usuário já Cadastrado!' })
      }

      const user: any = await User.create(request.body)
      // Mesmo que o email foi removido para aparecer nas requisições ele é enviado, temos que bloquear manualmente
      user.password = undefined

      return response.send({ user, token: AuthController.generateToken({ id: user.id }) })

      // return response.send({ user, token })
    } catch (error) {
      return response.status(400).send({ error: 'Opa! Ocorreu um erro inexperado, tente novamente!' })
    }
  }

  public async authentication (request: any, response: any) {
    try {
      const { email, password } = request.body

      // Verifica se o usuário existe
      const user: any = await User.findOne({ email }).select('+password')

      if (!user) {
        return response.status(400).send({ error: 'Usuário não Encontrado!' })
      }

      if (!await bcrypt.compare(password, user.password)) {
        return response.status(400).send({ error: 'Senha Inválida!' })
      }

      // Não mostrar o password na chamada
      user.password = undefined

      return response.send({ user, token: AuthController.generateToken({ id: user.id }) })
    } catch (error) {
      return response.status(400).send({ error: 'Opa! Ocorreu um erro inexperado, tente novamente!' })
    }
  }

  public async forgotPassword (request: any, response: any) {
    const { email } = request.body

    try {
      const user = await User.findOne({ email })

      if (!user) {
        return response.status(400).send({ error: 'Usuário não encontrado!' })
      }

      const token = crypto.randomBytes(20).toString('hex')

      const now = new Date()
      now.setHours(now.getHours() + 1)

      // Alterando a senha do usuário, criando um novo token para resetar a senha e alterando a data de alteração de senha
      await User.findByIdAndUpdate(user.id, {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: now
        }
      })

      mailer.sendMail({
        to: email,
        from: 'alfredok@icloud.com',
        template: 'auth/forgot_password',
        context: { token }
      }, (error) => {
        if (error) { return response.status(400).send({ error: 'Cannot send forgot password email' }) }

        return response.send({ msg: 'Email enviado com a nova senha' })
      })
    } catch (error) {
      console.log(error)
      return response.status(400).send({ error: 'Opa! Ocorreu um erro inexperado, tente novamente!' })
    }
  }

  public async resetPassword (request: any, response: any) {
    const { email, token, password } = request.body

    try {
      const user = await User.findOne({ email })
        .select('+passwordResetToken passwordResetExpires')

      if (!user) {
        return response.status(400).send({ error: 'Usuário não encontrado!' })
      }

      if (token !== user.passwordResetToken) {
        return response.status(400).send({ error: 'Token Invalid!' })
      }

      const now = new Date()

      if (now > user.passwordResetExpires) {
        return response.status(400).send({ error: 'Token expired, generate a new one' })
      }

      user.password = password

      await user.save()
      response.send({ msg: 'Senha alterada com sucesso!' })
    } catch (error) {
      return response.status(400).send({ error: 'Opa! Ocorreu um erro inexperado, tente novamente!' })
    }
  }
}

export default AuthController

import Imovel from '../models/imoveis'
import User from '../models/users'

class ImovelController {
  async index (request: any, response: any) {
    try {
      const imovel = await Imovel.find().populate('imoveis')

      return response.send({ imovel })
    } catch (error) {
      return response.status(400).send({ error: 'Opa! Ocorreu um erro inexperado, tente novamente!' })
    }
  }

  async show (request: any, response: any) {
    try {
      const imovel = await Imovel.findById(request.params.imovelId).populate('imoveis')

      return response.send({ imovel })
    } catch (error) {
      return response.status(400).send({ error: 'Opa! Ocorreu um erro inexperado, tente novamente!' })
    }
  }

  async create (request: any, response: any) {
    try {
      const { userId } = request.body
      if (!userId) {
        return response.status(400).send({ error: 'Você precisa se logar para poder cadastrar o seu Imóvel!' })
      }

      const imovel = await Imovel.create(request.body)

      await User.findByIdAndUpdate('5f07d4ba809324826cec7643', { $push: { imoveis: imovel } })

      return response.status(200).send({ imovel })
    } catch (error) {
      return response.status(400).send({ error: 'Opa! Ocorreu um erro inexperado, tente novamente!' })
    }
  }

  async update (request: any, response: any) {
    try {
      const {
        userId,
        preco,
        condominio,
        iptu,
        localizacao,
        caracteristicasApartamento,
        caracteristicasCondominio,
        descricaoTituloImovel,
        descricaoImovel,
        planta,
        fotos
      } = request.body

      const imovel = await Imovel.findByIdAndUpdate(request.params.imovelId, {
        userId,
        preco,
        condominio,
        iptu,
        localizacao,
        caracteristicasApartamento,
        caracteristicasCondominio,
        descricaoTituloImovel,
        descricaoImovel,
        planta,
        fotos
      }, { new: true })

      // Obs.: Remove todas as tasks antes de salvar novamente
      // cota.tasks = []
      // await Task.remove({ cota: cota._id })

      // Obs.: Precisa executar toda esta promisse primeiramente para depois executar o await cota.save()
      // await Promise.all(tasks.map(async task => {
      //   const cotaTask = new Task({ ...task, cota: cota._id })

      //   await cotaTask.save()
      //   cota.tasks.push(cotaTask)
      // }))

      await imovel.save()

      return response.status(200).send({ imovel })
    } catch (error) {
      return response.status(400).send({ error: 'Opa! Ocorreu um erro inexperado, tente novamente!' })
    }
  }

  async delete (request: any, response: any) {
    try {
      await Imovel.findByIdAndRemove(request.params.imovelId)
      await User.update(
        { _id: '5f07d4ba809324826cec7643' },
        { $pullAll: { imoveis: [request.params.imovelId] } }
      )

      return response.send({ msg: 'Imóvel Removido com Sucesso' })
    } catch (error) {
      return response.status(400).send({ error: 'Opa! Ocorreu um erro inexperado, tente novamente!' })
    }
  }
}

export default ImovelController

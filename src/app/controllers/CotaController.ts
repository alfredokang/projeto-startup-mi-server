import Cota from '../models/imoveis'
import Task from '../models/sales'

class CotaController {
  async index (request: any, response: any) {
    try {
      const cotas = await Cota.find().populate(['user', 'tasks'])

      return response.send({ cotas })
    } catch (error) {
      return response.status(400).send({ error: 'Opa! Ocorreu um erro inexperado, tente novamente!' })
    }
  }

  async show (request: any, response: any) {
    try {
      const cota = await Cota.findById(request.params.cotaId).populate(['user', 'tasks'])

      return response.send({ cota })
    } catch (error) {
      return response.status(400).send({ error: 'Opa! Ocorreu um erro inexperado, tente novamente!' })
    }
  }

  async create (request: any, response: any) {
    try {
      const { title, description, tasks } = request.body
      const cota = await Cota.create({ title, description, user: request.userId })

      // Obs.: Precisa executar toda esta promisse primeiramente para depois executar o await cota.save()
      await Promise.all(tasks.map(async task => {
        const cotaTask = new Task({ ...task, cota: cota._id })

        await cotaTask.save()
        cota.tasks.push(cotaTask)
      }))

      await cota.save()

      return response.status(200).send({ cota })
    } catch (error) {
      return response.status(400).send({ error: 'Opa! Ocorreu um erro inexperado, tente novamente!' })
    }
  }

  async update (request: any, response: any) {
    try {
      const { title, description, tasks } = request.body
      const cota = await Cota.findByIdAndUpdate(request.params.cotaId, {
        title,
        description
      }, { new: true })

      // Obs.: Remove todas as tasks antes de salvar novamente
      cota.tasks = []
      await Task.remove({ cota: cota._id })

      // Obs.: Precisa executar toda esta promisse primeiramente para depois executar o await cota.save()
      await Promise.all(tasks.map(async task => {
        const cotaTask = new Task({ ...task, cota: cota._id })

        await cotaTask.save()
        cota.tasks.push(cotaTask)
      }))

      await cota.save()

      return response.status(200).send({ cota })
    } catch (error) {
      return response.status(400).send({ error: 'Opa! Ocorreu um erro inexperado, tente novamente!' })
    }
  }

  async delete (request: any, response: any) {
    try {
      await Cota.findByIdAndRemove(request.params.cotaId)

      return response.send({ msg: 'Cota Removida com Sucesso' })
    } catch (error) {
      return response.status(400).send({ error: 'Opa! Ocorreu um erro inexperado, tente novamente!' })
    }
  }
}

export default CotaController

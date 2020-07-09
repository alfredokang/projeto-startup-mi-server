
class ClearedController {
  async clear (request: any, response: any) {
    response.send({ ok: true, user: request.userId })
  }
}

export default ClearedController

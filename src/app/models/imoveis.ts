import mongoose from '../../database/connection'

// Criando o Schema
const ImovelSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'user'
  },
  preco: {
    type: Number,
    required: true
  },
  condominio: {
    type: Number,
    required: false
  },
  iptu: {
    type: Number,
    required: false
  },
  localizacao: {
    rua: { type: String, required: false },
    numero: { type: Number, required: false },
    complemento: { type: String, required: false },
    bairro: { type: String, required: false },
    cep: { type: Number, required: false },
    cidade: { type: String, required: false },
    estado: { type: String, required: false },
    latitude: { type: String, required: false },
    longitude: { type: String, required: false }
  },
  caracteristicasApartamento: {
    tipo: { type: String, required: false },
    nome: { type: String, required: false },
    andar: { type: Number, required: false },
    metroQuadrado: { type: Number, required: false },
    mobiliado: { type: Boolean, required: false },
    reformado: { type: Boolean, required: false },
    vagas: { type: Number, required: false },
    suites: { type: Number, required: false },
    quartos: { type: Number, required: false },
    detalhes: { type: String, required: false }
  },
  caracteristicasCondominio: {
    andarTotal: { type: Number, required: false },
    academia: { type: Boolean, required: false },
    espacoGourmet: { type: Boolean, required: false },
    piscina: { type: Boolean, required: false },
    salaoFestas: { type: Boolean, required: false },
    salaoJogos: { type: Boolean, required: false },
    areaVerde: { type: Boolean, required: false },
    quadraTennis: { type: Boolean, required: false },
    quadraPoliesportiva: { type: Boolean, required: false },
    espacoPet: { type: Boolean, required: false },
    detalhes: { type: String, required: false }
  },
  descricaoTituloImovel: {
    type: String,
    required: false
  },
  descricaoImovel: {
    type: String,
    required: false
  },
  planta: {
    type: String,
    required: false
  },
  fotos: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

interface IImovelSchema extends mongoose.Document {
  userId: String,
  preco: Number,
  condominio: Number,
  iptu: Number,
  localizacao: {
    rua: String,
    numero: Number,
    complemento: String,
    bairro: String,
    cep: Number,
    cidade: String,
    estado: String,
    latitude: String,
    longitude: String
  },
  caracteristicasApartamento: {
    tipo: String,
    nome: String,
    andar: Number,
    metroQuadrado: Number,
    mobiliado: Boolean,
    reformado: Boolean,
    vagas: Number,
    suites: Number,
    quartos: Number,
    detalhes: String
  },
  caracteristicasCondominio: {
    andarTotal: Number,
    academia: Boolean,
    espacoGourmet: Boolean,
    piscina: Boolean,
    salaoFestas: Boolean,
    salaoJogos: Boolean,
    areaVerde: Boolean,
    quadraTennis: Boolean,
    quadraPoliesportiva: Boolean,
    espacoPet: Boolean,
    detalhes: String
   },
  descricaoTituloImovel: string,
  descricaoImovel: string,
  planta: String,
  fotos: [],
  createdAt: Date
}

export default mongoose.model<IImovelSchema>('Imovel', ImovelSchema)

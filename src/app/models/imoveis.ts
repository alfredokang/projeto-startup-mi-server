import mongoose from '../../database/connection'

// Criando o Schema
const ImovelSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  preco: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  condominio: {
    type: mongoose.Schema.Types.Decimal128,
    required: false
  },
  iptu: {
    type: mongoose.Schema.Types.Decimal128,
    required: false
  },
  localizacao: {
    rua: { type: String, required: true },
    numero: { type: Number, required: true },
    complemento: { type: String, required: true },
    bairro: { type: String, required: true },
    cep: { type: Number, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true },
    latitude: { type: String, required: false },
    longitude: { type: String, required: false }
  },
  caracteristicasApartamento: {
    tipo: { type: String, required: false },
    nome: { type: String, required: false },
    andar: { type: Number, required: true },
    metroQuadrado: { type: mongoose.Schema.Types.Decimal128, required: true },
    mobiliado: { type: Boolean, required: true },
    reformado: { type: Boolean, required: true },
    vagas: { type: Number, required: true },
    suites: { type: Number, required: true },
    quartos: { type: Number, required: true },
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
    required: true
  },
  descricaoImovel: {
    type: String,
    required: true
  },
  planta: {
    type: String,
    required: false
  },
  fotos: [{
    type: mongoose.Schema.Types.ObjectId
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

interface IImovelSchema extends mongoose.Document {
  userId: string,
  preco: mongoose.Types.Decimal128,
  condominio: mongoose.Types.Decimal128,
  iptu: mongoose.Types.Decimal128,
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
    metroQuadrado: mongoose.Types.Decimal128,
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

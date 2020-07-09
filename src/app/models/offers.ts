import mongoose from '../../database/connection'

// Criando o Schema
const OfferSchema = new mongoose.Schema({
  sellerId: {
    type: String,
    required: true
  },
  buyerId: {
    type: String,
    required: true
  },
  cotaId: {
    type: String,
    required: true
  },
  offer: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

interface IOfferSchema extends mongoose.Document {
  sellerId: string,
  buyerId: string,
  cotaId: string,
  offer: mongoose.Types.Decimal128,
  createdAt: Date
}

export default mongoose.model<IOfferSchema>('Offer', OfferSchema)

import mongoose from '../../database/connection'

// Criando o Schema
const SaleSchema = new mongoose.Schema({
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
  salePrice: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

interface ISaleSchema extends mongoose.Document {
  sellerId: string,
  buyerId: string,
  cotaId: string,
  salePrice: mongoose.Types.Decimal128,
  createdAt: Date
}

export default mongoose.model<ISaleSchema>('Sale', SaleSchema)

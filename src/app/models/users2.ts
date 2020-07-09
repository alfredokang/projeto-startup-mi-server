import mongoose from '../../database/connection'
import bcrypt from 'bcryptjs'

// Criando o Schema
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  cpf: {
    type: Number,
    required: true
  },
  rg: {
    type: Number,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  complement: {
    type: String,
    required: true
  },
  neighborhood: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipcode: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  cotas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cota'
  }],
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

interface IUserSchema extends mongoose.Document {
    firstName: string,
    lastName: string,
    cpf: number,
    rg: number,
    mobile: number,
    address: string,
    number: number,
    complement: string,
    neighborhood: string,
    city: string,
    state: string,
    zipcode: number,
    email: string,
    password: string,
    cotas: mongoose.Types.Array<string>,
    passwordResetToken: string | undefined,
    passwordResetExpires: Date | undefined
    createdAt: Date
}

UserSchema.pre<IUserSchema>('save', async function (next: any) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

export default mongoose.model<IUserSchema>('User', UserSchema)

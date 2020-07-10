import mongoose from '../../database/connection'
import bcrypt from 'bcryptjs'

// Criando o Schema
const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  mobile: {
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
  imoveis: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'imovel'
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
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    imoveis: mongoose.Types.Array<string>,
    passwordResetToken: string | undefined,
    passwordResetExpires: Date | undefined,
    createdAt: Date | undefined
}

UserSchema.pre<IUserSchema>('save', async function (next: any) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

export default mongoose.model<IUserSchema>('User', UserSchema)

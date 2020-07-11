import mongoose from 'mongoose'
import 'dotenv/config'

mongoose.connect(process.env.DB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(db => console.log('\x1b[32m%s\x1b[0m', '-> Database connected')).catch(error => console.error(error))

mongoose.Promise = global.Promise

export default mongoose

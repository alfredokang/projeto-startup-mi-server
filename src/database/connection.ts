import mongoose from 'mongoose'
import dbConfig from '../config/dbConfig.json'

mongoose.connect(dbConfig.dbUri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(db => console.log('\x1b[32m%s\x1b[0m', '-> Database connected')).catch(error => console.error(error))

mongoose.Promise = global.Promise

export default mongoose

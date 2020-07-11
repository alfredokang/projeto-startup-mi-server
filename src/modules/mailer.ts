import 'dotenv/config'
import nodemailer from 'nodemailer'
// import path from 'path'
// import hbs from 'nodemailer-express-handlebars'
const host = process.env.MAILTRAP_HOST
const port = process.env.MAILTRAP_PORT
const user = process.env.MAILTRAP_USER
const pass = process.env.MAILTRAP_PASS
const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass }
})

// transport.use('compile', hbs({
//   viewEngine: 'handlebars',
//   viewPath: path.resolve('./src/resources/mail/'),
//   extName: '.html'
// }))

export default transport

// import path from 'path'
import nodemailer from 'nodemailer'
import { host, port, user, pass } from '../config/mail.json'
// import hbs from 'nodemailer-express-handlebars'

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

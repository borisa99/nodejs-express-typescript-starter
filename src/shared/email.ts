import nodemailer from 'nodemailer'

export const mailer = nodemailer.createTransport({
  port: Number(process.env.SMTP_PORT),
})

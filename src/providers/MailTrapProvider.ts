import nodemailer from 'nodemailer'
import { config } from 'dotenv'

config()

export const mailProvider = nodemailer.createTransport({
	host: `${process.env.MAIL_HOST}`,
	port: Number.parseInt(`${process.env.MAIL_PORT}`),
	auth: {
		user: `${process.env.MAIL_USER}`,
		pass: `${process.env.MAIL_PASS}`,
	},
})

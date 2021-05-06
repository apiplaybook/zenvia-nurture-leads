import { mailProvider } from '../providers/MailTrapProvider'

export interface IInvolved {
	address: string
	name: string
}

interface IMail {
	to: IInvolved
	from: IInvolved
	body: string
	subject: string
}

export const sendMail = async (mail: IMail) => {
	await mailProvider.sendMail({
		to: mail.to,
		from: mail.from,
		html: mail.body,
		subject: mail.subject,
	})
}

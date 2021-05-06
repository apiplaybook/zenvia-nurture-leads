import { sendMail, IInvolved } from './sendMail'
import { getLeads } from './getLeads'

export const nurtureLeadsWithMessage = async (from: IInvolved) => {
	const allLeads = await getLeads() // Chama a função que busca no banco de dados os leads cadastrados

	// Envia um e-mail programado para todos os leads que não especificaram o motivo do contato

	allLeads
		.filter((lead) => lead.mensagem !== '')
		.forEach(async (lead) => {
			await sendMail({
				from,
				to: {
					address: lead.email,
					name: lead.nome,
				},
				subject: `Recebemos seu contato ${lead.nome}.`,
				body: `Olá ${lead.nome}! Tudo bem? <br/> Somos da Prensa e recentemente recebemos sua solicitação de contato através do nosso chat, sobre ${lead.mensagem}. Sua situação está sendo analisada por um de nossos especialistas e logo mais ele entrará em contato com você`,
			})
		})
}

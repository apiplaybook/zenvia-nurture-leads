import express, { Request, Response, json } from 'express'
import { saveLead } from './functions/saveLead'
import { getLeads } from './functions/getLeads'
import { nurtureLeadsWithoutMessage } from './functions/nurtureLeadsWithoutMessage'
import { nurtureLeadsWithMessage } from './functions/nurtureLeadsWithMessage'

// Inicializa o express e define uma porta
const app = express()
const PORT = 3000

// Indica para o express usar o JSON parsing do body-parser
app.use(json())

app.post('/lead', async (request: Request, response: Response) => {
	// Armazena os parâmetros passados pelo Zenvia Flow em variáveis
	const { nome, empresa, mensagem, email } = request.query

	// Verifica se as variáveis não são strings
	if (
		typeof nome !== 'string' ||
		typeof empresa !== 'string' ||
		typeof email !== 'string' ||
		typeof mensagem !== 'string'
	) {
		response.status(400).end() // Responde quem solicitou nosso webhook com status 400
	} else {
		// Caso forem strings
		try {
			// Chama a função que armazena o Lead no banco de dados
			const createdLead = await saveLead({
				nome,
				empresa,
				email,
				mensagem,
			})

			response.status(201).json(createdLead) // Responde quem solicitou nosso webhook com status 200
		} catch (error) {
			response.status(500).end() // Responde quem solicitou nosso webhook com status 500 de erro
		}
	}
})

app.get('/leads', async (request: Request, response: Response) => {
	try {
		const allLeads = await getLeads() // Chama a função que busca os Leads no banco de dados
		response.status(200).json(allLeads) // Responde quem solicitou nosso webhook com status 200
	} catch (error) {
		response.status(500).end() // Responde quem solicitou nosso webhook com status 500 de erro
	}
})

app.post('/sendMailToLeadsWithoutMessage', async (request: Request, response: Response) => {
	try {
		const { from } = request.body // Armazena as informações vindas no corpo da requisição em variáveos

		await nurtureLeadsWithoutMessage(from) // Chama a função que envia os e-mails

		response.status(200).send() // Responde quem solicitou nosso webhook com status 200
	} catch (error) {
		response.status(500).end() // Responde quem solicitou nosso webhook com status 500 de erro
	}
})

app.post('/sendMailToLeadsWithMessage', async (request: Request, response: Response) => {
	try {
		const { from } = request.body // Armazena as informações vindas no corpo da requisição em variáveos

		await nurtureLeadsWithMessage(from) // Chama a função que envia os e-mails

		response.status(200).send() // Responde quem solicitou nosso webhook com status 200
	} catch (error) {
		response.status(500).end() // Responde quem solicitou nosso webhook com status 500 de erro
	}
})

// Inicia o express na porta definida anteriormente
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))

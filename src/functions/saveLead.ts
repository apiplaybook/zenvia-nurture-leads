import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface ISaveLeadInput {
	nome: string
	email: string
	empresa: string
	mensagem: string
}

export const saveLead = async (data: ISaveLeadInput) => {
	return await prisma.lead.create({ data })
}

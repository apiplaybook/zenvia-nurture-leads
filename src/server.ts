import express, { json } from 'express'

// Inicializa o express e define uma porta
const app = express()
const PORT = 3000

// Indica para o express usar o JSON parsing do body-parser
app.use(json())

// Inicia o express na porta definida anteriormente
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))

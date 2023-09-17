import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

// const database = new DatabaseMemory()
const database = new DatabasePostgres()

// Métodos do protocolo HTTP que referenciam as ações que a gente faz na API

// GET - buscar, POST - criar, PUT - alterar, DELETE - deletar, PATCH - alterar uma info específica

// Request Body - Contém os dados enviados na requisição via método
// POST e PUT, não GET

// Formato convencional de troca de informações
// entre sistemas na Web é o JSON.

// Sempre que há um POST, ou seja, um envio de dados
// para o backend, é preciso definir no HEADER 
// o tipo de dado sendo enviado.

// Metadado
// Accept-Langague: pt
// Content-type: application/json

server.post('/videos', async (request, reply) => {
     const { title, description, duration } = request.body


     // Quando a chave = valor, existe a short-sintax no js
     await database.create({
          title: title,
          description: description,
          duration: duration,
     })

     return reply.status(201).send() // Algo foi criado
})

server.get('/videos', async (request) => {
     const search = request.query.search

     console.log(search)

     const videos = await database.list(search)

     console.log(videos)

     return videos
})

// GET http://localhost:3333/videos - pegando vídeos
// POST http://localhost:3333/videos - criando vídeos
// PUT http://localhost:3333/videos/:id - alterando vídeos
// Portanto, é possível haver rotas com métodos diferentes para os mesmos recursos

// Route Parameter - id

server.put('/videos/:id', async (request, reply) => {
     const videoId = request.params.id
     const { title, description, duration } = request.body

     await database.update(videoId, {
          title,
          description,
          duration,
     })

     return reply.status(204).send()
     // Status 204 - Positivo mas sem conteúdo, vazia
})


server.delete('/videos/:id', async (request, reply) => {
     const videoId = request.params.id
     
     await database.delete(videoId)

     
     return reply.status(204).send()
})


server.listen({
     port: process.env.PORT ?? 3333,
})

// Quando criamos um servidor HTTP com Node tradicional todas as rotas estão embutidas na mesma
// função, e dentro dela ocorre esse direcionamento. 
// Agora ao utilizarmos um framework, como o Fastify, são criadas várias rotas diferentes, como 
// a localhost:3333/ (raiz)

// Quando o navegador acessa uma rota, ele usa o método GET para fazer a requisição.
// Ou seja, não é possível testar rotas POST, PUT, DELETE
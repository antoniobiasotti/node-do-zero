// Create package.json with configs {}
// type: "ECMAScript Module"
import {} from 'node:fs' // File System
import {} from 'node:crypto' // Cryptography
import { createServer } from 'node:http' //HTTP Servers
// createServer function; acessível pelo nav

const server = createServer((request, response) => {
    console.log('oi')
    response.write('oi')
    return response.end()
})

// request: dados da requisição feita pelo usuário para a API
// response: objeto utilizado para devolver uma resposta a quem chamou a API

server.listen(3333)

// localhost: 3333
// flag --watch

// Além de já possuir uma estrutura built-in para criar e inicializar um servidor,
// Um framework facilita dividir os endpoints (rotas) do servidor dependendo da funcionalidade
// acessada pelo usuário conforme o método POST, DELETE...

// Micro-Frameworks list:
// JS: Fastify, Express, Nest, Koa
// PHP: Lumen
// Ruby: Sinatra
// Python: FastAPI ou Flask

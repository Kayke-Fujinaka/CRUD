// npm run dev (Rodar Servidor)

/* 

Query Params = meusite.com/users?nome=rodolfo&age=28 // Filtro
    - Cada um usa o seu
Route Params = /users/2 // Buscar, Deletar ou Atualizar algo específico
Request body { "name":"Rodolfo", "age":} 

Get - Busca informação no Back
Post - Cria informação no Back
Put / Patch - Alterar / Atualizar informação no Back
Delete - Deleta informação no Back

Middlewares são interceptadores que tem a opção de parar ou alterar algum dado, 
ou seja, funções que executam processos intermédios.

*/

const express = require("express")
const uuid = require('uuid')
const port = 3000

const app = express()
app.use(express.json())



const users = []

const checkuser = (request, response, next) => {

    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0){
        return response.status(404).json({ error: "User not found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {

    return response.status(201).json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.json(user)
})

app.put('/users/:id', checkuser, (request, response) => {
    
    const { name, age } = request.body
    const id = request.userId
    const index = request.userIndex
    const updateUser = { id, name, age }

    users[index] = updateUser

    return response.status(200).json(updateUser)
})

app.delete('/users/:id', checkuser, (request, response) => {
    const index = request.userIndex

    users.splice(index,1)

    return response.status(200).json()
})

app.listen(port, () =>{
    console.log(`Server started on port ${port}`)
})
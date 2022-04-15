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

*/

const express = require("express")
const uuid = require('uuid')
const port = 3000

const app = express()
app.use(express.json())



const users = []

app.get('/users', (request, response) => {

    return response.status(201).json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.json(user)
})

app.put('/users/:id', (request, response) => {

    const { id } = request.params
    const { name, age } = request.body

    const updateUser = { id, name, age }

    const index = users.findIndex(user => user.id === id)

    if (index < 0){
        return response.status(404).json({ message: "User not found" })
    }

    users[index] = updateUser

    return response.status(200).json(updateUser)
})

app.delete('/users/:id', (request, response) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0){
        return response.status(404).json({ message: "User not found" })
    }

    users.splice(index,1)

    return response.status(200).json()
})

app.listen(port, () =>{
    console.log(`Server started on port ${port}`)
})
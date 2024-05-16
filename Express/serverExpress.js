const express = require('express')
const server = express()
const port = 3000

let usersArr = [
    { id: 1, username: 'johndoe', job: 'Software Engineer' },
    { id: 2, username: 'janesmith', job: 'Data Scientist' },
    { id: 3, username: 'michaelbrown', job: 'Product Manager' },
    { id: 4, username: 'emilydavis', job: 'UX Designer' },
    { id: 5, username: 'williamjohnson', job: 'Marketing Specialist' },
    { id: 6, username: 'oliviagarcia', job: 'Sales Executive' },
    { id: 7, username: 'jamesmartinez', job: 'System Administrator' },
    { id: 8, username: 'isabellarodriguez', job: 'Business Analyst' },
    { id: 9, username: 'ethanlee', job: 'Network Engineer' },
    { id: 10, username: 'masonwilson', job: 'Graphic Designer' }
]


server.use(express.json())

server.use((req, res, next) => {
    console.log(`Richiesta ${req.method} arrivata da ${req.url}`);
    next()
})

server.get('/', (req, res) => {
    res.status(200)
    res.json(usersArr)
})

server.get('/users/:id', (req, res) => {
    console.log(req.params);
    const id = Number(req.params.id)
    const user = usersArr.find(item => item.id === id)
    res.status(200).json(user)
})

server.post('/submit', (req, res) => {
    const userData = req.body
    console.log(userData);
    usersArr.push(userData)
    res.status(201).json({'msg': 'dati salvati'})
})


server.delete('/delete/:id', (req, res) => {
    const id = Number(req.params.id)
    const filtered = usersArr.filter(item => item.id !== id)
    usersArr = filtered
    res.status(200).json({'msg': 'utente eliminato'})
})

server.patch('/update/:id', (req, res) => {
    const id = Number(req.params.id)
    const username = req.body.username
    const updated = usersArr.map(item => {
        if (item.id === id) {
            return {...item, username: username}
        } else {
            return item
        }
    })
    console.log(updated);

    usersArr = updated

    res.status(200).json({'msg': 'username modificato'})
})


server.use((req, res, next) => {
    res.status(404).json({'msg': 'page not found'})
    next()
})


server.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
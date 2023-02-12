var cors = require('cors')
const express = require('express')

const connectToMongo = require('./db')
connectToMongo()
const port = 5000

const app = express()
app.use(cors())

// middle ware for req.body 
app.use(express.json())

// available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello sourabh baba !')
})



app.listen(port, () => {
  console.log(`Enote backend running on port http://localhost:${port}`)
})
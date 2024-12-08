import dotenv from 'dotenv'
dotenv.config({path: `.env.local`})
dotenv.config()
import cors from 'cors'
import express from 'express'

const app = express()

// cors
app.use(cors())

app.get('/', (req, res) =>{

  res.send('Hello there')
})

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`)
})
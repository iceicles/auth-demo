import dotenv from 'dotenv'
dotenv.config({path: `.env.local`})
dotenv.config()
import cors from 'cors'
import express from 'express'
import authRouter from './routes/auth'
import { connectDB } from './db/connect'

const app = express()

// cors
app.use(cors())

// middleware
app.use(express.json())

// auth routes
app.use('/api/v1/auth', authRouter)

// app.get('/', (req, res) =>{

//   res.send('Hello there')
// })

const port = process.env.PORT || 4000
const mongoDBConnectionURL = process.env.MONGO_URI as string

const start = async () => {
  try {
    await connectDB(mongoDBConnectionURL)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
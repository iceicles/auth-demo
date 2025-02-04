import 'express-async-errors'
import dotenv from 'dotenv'
dotenv.config({path: `.env.local`})
dotenv.config()
import cors from 'cors'
import express from 'express'
import authRouter from './routes/auth'
import userRouter from './routes/user'
import { connectDB } from './db/connect'
import cookieParser from 'cookie-parser';
import { notFoundMW } from './middleware/not-found'
import {errorHandlerMW} from './middleware/error-handler'

const app = express()


const corsOptions = {
  origin: 'http://localhost:3000', // frontend url
  credentials: true, // allows cookies to be sent
}
// cors
app.use(cors(corsOptions))

// Before any route or middleware that accesses cookies
// secret passed to cookieParser is required for signed cookies
app.use(cookieParser(process.env.JWT_SECRET)); 

// middleware
app.use(express.json())

// auth routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)

app.use(notFoundMW);
app.use(errorHandlerMW);

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
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
// import rateLimiter from 'express-rate-limit'
import helmet from 'helmet'
import xss from 'xss'
import mongoSanitize from 'express-mongo-sanitize'

const app = express()

console.log('JWT_SECRET:', process.env.JWT_SECRET); 

const corsOptions = {
  // this shouldn't matter as both the client & server on deployed to same domain
  origin: 'https://authdemo.vercel.app', // frontend url
  credentials: true, // allows cookies to be sent
}
//cors
app.use(cors(corsOptions))

// security pkgs
// app.use(rateLimiter({
//   windowMs: 15 * 60 * 1000,
//   limit: 60
// }))
app.use(helmet())
xss('<script>alert("xss");</script>')
app.use(mongoSanitize())

// Before any route or middleware that accesses cookies
// secret passed to cookieParser is required for signed cookies
app.use(cookieParser(process.env.JWT_SECRET)); 

// middleware
app.use(express.json())
// checks that the origin is the allowed client url
// app.use(sameOriginMiddleware)

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

// reason this is needed -- 
// on vercel, each api request will be handled by a serverless function and vercel requires the export of this handler function
export default (req: any, res: any) => {
  app(req, res); // use the express app handler for the API requests
};
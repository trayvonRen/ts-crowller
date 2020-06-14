import express, { Request, Response, NextFunction } from 'express'

import './controller/LoginController'
import './controller/CrowllerController'

import cookieSession from 'cookie-session'

import bodyParser from 'body-parser'

import router from './router'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(
  cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 24 * 60 * 60 * 1000,
  })
)

app.use((req: Request, res: Response, next: NextFunction) => {
  req.teacherName = 'dell'
  next()
})
app.use(router)

app.listen(7001, () => {
  console.log('server is running')
})

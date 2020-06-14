import 'reflect-metadata'

import { Router, Request, Response, NextFunction } from 'express'
import { getResponseData } from '../utils/util'
import { controller, get, post } from '../decorator'

interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined
  }
}

@controller('/')
export class LoginController {
  static isLogin(req: BodyRequest): boolean {
    return !!(req.session ? req.session.login : false)
  }
  @post('/login')
  login(req: BodyRequest, res: Response): void {
    const { password } = req.body
    if (LoginController.isLogin(req)) {
      res.json(getResponseData(null, '已经登陆过'))
    } else {
      if (password === '123' && req.session) {
        req.session.login = true
        res.json(getResponseData(true))
      } else {
        res.json(getResponseData(null, '登录失败'))
      }
    }
  }

  @get('/logout')
  logout(req: BodyRequest, res: Response): void {
    if (req.session) {
      req.session.login = undefined
    }
    res.json(getResponseData(true))
  }

  @get('/')
  home(req: BodyRequest, res: Response): void {
    if (LoginController.isLogin(req)) {
      res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
        </head>
        <body>
        <a href='/getData'>爬取内容</a>
        <a href='/showData'>展示内容</a>
         <a href='/logout'>退出</a>
        </body>
      </html>
      
      `)
    } else {
      res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <form action="/login" method="post">
          <input type="password" name="password" />
          <button>登录</button>
        </form>
      </body>
    </html>
    
    `)
    }
  }
}

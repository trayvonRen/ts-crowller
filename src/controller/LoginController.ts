import 'reflect-metadata'

import { Router, Request, Response, NextFunction } from 'express'
import { getResponseData } from '../utils/util'
import { controller, get, post } from '../decorator'

interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined
  }
}

@controller('/api')
export class LoginController {
  static isLogin(req: BodyRequest): boolean {
    return !!(req.session ? req.session.login : false)
  }
  @post('/login')
  login(req: BodyRequest, res: Response): void {
    const { password } = req.body
    if (LoginController.isLogin(req)) {
      res.json(getResponseData(true))
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

  @get('/isLogin')
  isLogin(req: BodyRequest, res: Response): void {
    const isLogin = LoginController.isLogin(req)
    res.json(getResponseData(isLogin))
  }
}

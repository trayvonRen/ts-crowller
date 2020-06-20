import { Router, Request, Response, NextFunction } from 'express'
import { getResponseData } from '../utils/util'
import { controller, use, get } from '../decorator'
import Crowller from '../utils/crowller'
import Analyzer from '../utils/analyzer'
import fs from 'fs'
import path from 'path'

interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined
  }
}

const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
  const isLogin = !!(req.session ? req.session.login : false)
  if (isLogin) {
    next()
  } else {
    res.json(getResponseData(null, '请先登录'))
  }
}

@controller('/api')
export class CrowllerController {
  @get('/getData')
  @use(checkLogin)
  getData(req: Request, res: Response): void {
    const url = 'https://v.qq.com/'
    const analyzer = Analyzer.getInstance()
    new Crowller(analyzer, url)
    res.json(getResponseData(true))
  }

  @get('/showData')
  @use(checkLogin)
  showData(req: Request, res: Response): void {
    try {
      const position = path.resolve(__dirname, '../../data/course.json')
      const result = fs.readFileSync(position, 'utf-8')
      res.json(JSON.parse(result))
    } catch (e) {
      res.json(getResponseData(null, '尚未爬取到内容'))
    }
  }
}

import { RequestHandler } from 'express'
import { CrowllerController, LoginController } from '../controller'

export function use(middleware: RequestHandler) {
  return function (target: CrowllerController | LoginController, key: string) {
    const originMiddiewares = Reflect.getMetadata('middlewares', target, key) || []
    originMiddiewares.push(middleware)
    Reflect.defineMetadata('middlewares', originMiddiewares, target, key)
  }
}

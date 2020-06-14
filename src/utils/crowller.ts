import superagent from 'superagent'
import fs from 'fs'
import path from 'path'

import { Analyzer } from '../interface'

class Crowller {
  private filePath = path.resolve(__dirname, '../../data/course.json')

  async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
  }

  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content)
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml()
    const fileContent = this.analyzer.analyze(html, this.filePath)
    this.writeFile(fileContent)
  }

  constructor(private analyzer: Analyzer, private url: string) {
    this.initSpiderProcess()
  }
}

export default Crowller

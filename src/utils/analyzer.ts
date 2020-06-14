import cheerio from 'cheerio'
import fs from 'fs'
import { Course, courseResult, Content, Analyzer } from '../interface'

class DellAnalyzer implements Analyzer {
  private courseInfos: Course[] = []
  private static instance: DellAnalyzer
  static getInstance() {
    DellAnalyzer.instance = new DellAnalyzer()
    return DellAnalyzer.instance
  }
  private constructor() {}
  private getCourseInfo(html: string) {
    const $ = cheerio.load(html)
    const courseItems = $('.list_item')
    courseItems.map((index, element) => {
      const descs = $(element).find('.figure_desc').text()
      const title = $(element).find('.figure_title').text()
      this.courseInfos.push({ title, descs })
    })
    return {
      time: new Date(),
      data: this.courseInfos,
    }
  }

  private gengerateJsonContent(courseResult: courseResult, filePath: string) {
    let fileContent: Content = {}
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
    fileContent[courseResult.time.toString()] = courseResult.data
    return fileContent
  }
  public analyze(html: string, filePath: string) {
    const courseResult = this.getCourseInfo(html)
    const fileContent = this.gengerateJsonContent(courseResult, filePath)
    return JSON.stringify(fileContent)
  }
}

export default DellAnalyzer

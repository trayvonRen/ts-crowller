interface Course {
  title: string
  descs: string
}

interface courseResult {
  time: Date
  data: Course[]
}

interface Content {
  [propName: string]: Course[]
}

interface Analyzer {
  analyze: (html: string, filePath: string) => string
}

export { Course, courseResult, Content, Analyzer }

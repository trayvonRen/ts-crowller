interface Result {
  sucess: boolean
  errMsg?: string
  data: any
}

export const getResponseData = (data: any, errMsg?: string): Result => {
  if (errMsg) {
    return {
      sucess: false,
      errMsg,
      data,
    }
  }
  return {
    sucess: true,
    data,
  }
}

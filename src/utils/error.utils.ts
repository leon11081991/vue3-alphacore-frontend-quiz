export const getErrorMessage = (statusCode: number) => {
  switch (statusCode) {
    case 401:
      return '驗證失敗！請重新登入，將重新導向登入頁...'
  }
}
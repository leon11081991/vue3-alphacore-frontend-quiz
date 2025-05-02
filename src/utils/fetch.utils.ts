import { CommonUtils } from "@/utils/common.utils";
import { getErrorMessage } from "@/utils/error.utils";
import { useToast } from "@/composables/useToast";

const createFetchWithTimeout = (timeout: number = 5000) => {
  return function (url: string, options: RequestInit = {}): Promise<Response> {
    return new Promise((resolve, reject) => {
      const signalController = new AbortController()

      fetch(url, { ...options, signal: signalController.signal })
        .then(resolve, reject)

      setTimeout(() => {
        signalController.abort()
        reject(new Error('Request timed out'))
      }, timeout)
    });
  }
}
const fetchWithTimeout = createFetchWithTimeout()

export const fetchApi = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  try {
    const response = await fetchWithTimeout(url, options)

    // 錯誤
    if (!response.ok) {
      const { errorToast } = useToast()
      const toLoginPage = () => {
        CommonUtils.removeLocalStorage('token')
        window.location.href = '/login'
      }

      errorToast(`Fetch error: ${response.status} - ${getErrorMessage(response.status)}`, toLoginPage)
      const error = new Error(`Fetch error status: ${response.status} - ${response.statusText}`)
      return Promise.reject(error)
    }

    return response.json() as Promise<T>
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

export const postRequestWithoutAuth = async <T>(url: string, body: any, options: RequestInit = {}): Promise<T> => {
  return fetchApi<T>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify(body),
    ...options,
  })
}

const fetchApiWithAuth = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const token = CommonUtils.getLocalStorage<string>('token')
  console.log("fetchApiWithAuth token:", token);
  if (!token) {
    throw new Error('No token found')
  }

  return fetchApi<T>(url, {
    ...options,
    headers: {
      'Authorization': token,
      ...options.headers,
    },
  })
}

type Query = Record<string, string | number | boolean | string[] | undefined>
const buildQueryString = (query?: Query): string => {
  if (!query) return ''
  const params = new URLSearchParams()
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value))
    }
  })
  return params.toString() ? `?${params.toString()}` : ''
}

export const getRequest = async <T>(
  url: string,
  query: Query = {},
  options: RequestInit = {}
): Promise<T> => {
  const queryString = buildQueryString(query)

  return fetchApiWithAuth<T>(url + queryString, {
    method: 'GET',
    ...options,
  })
}
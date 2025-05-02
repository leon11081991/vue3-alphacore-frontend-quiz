import { Notify } from 'quasar'

export const useToast = () => {

  const show = (message: string, type: 'positive' | 'negative' | 'warning' | 'info' = 'info', fn?: () => void, timeout?: number) => {

    Notify.create({
      type,
      message,
      timeout: 3000,
      position: 'top-right',
      actions: [{ icon: 'close', color: 'white' }]
    })

    if (fn) {
      setTimeout(() => {
        fn()
      }, timeout || 3000)
    }
  }

  return {
    successToast: (msg: string, fn?: () => void, timeout?: number) => show(msg, 'positive', fn, timeout),
    errorToast: (msg: string, fn?: () => void, timeout?: number) => show(msg, 'negative', fn, timeout),
    warningToast: (msg: string, fn?: () => void, timeout?: number) => show(msg, 'warning', fn, timeout),
  }
}

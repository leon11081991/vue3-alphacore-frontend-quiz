export const useDebounce = <T extends (...args: any[]) => void>(fn: T, delay: number = 500) => {
  let timer: ReturnType<typeof setTimeout> | undefined

  const debounceFn = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };

  return debounceFn;
}
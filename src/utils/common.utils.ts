export class CommonUtils {
  static setLocalStorage<T>(key: string, val: T): void {
    localStorage.setItem(key, JSON.stringify(val));
  }

  static getLocalStorage<T>(key: string): T | null {
    const val = localStorage.getItem(key)
    if (val) return JSON.parse(val) as T;
    return null;
  }

  static removeLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  static toDollar(value: number): string {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  }
}
export class StackLocalStorage<T> {
  private currentStore: T
  constructor(initialStore: T) {
    this.currentStore = initialStore
  }
  run<X, A extends any[]>(store: T, f: (...args: A) => X, ...args: A): X {
    const oldStore = this.currentStore
    this.currentStore = store
    try {
      return f(...args)
    } finally {
      this.currentStore = oldStore
    }
  }
  getStore() {
    return this.currentStore
  }
}

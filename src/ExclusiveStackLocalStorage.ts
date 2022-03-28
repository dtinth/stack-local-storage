import { StackLocalStorage } from './StackLocalStorage'

export class ExclusiveStackLocalStorage<T> {
  private emptyErrorMessage: string
  private conflictErrorMessage: string
  private storage = new StackLocalStorage<{ value: T } | undefined>(undefined)

  constructor(options: {
    emptyErrorMessage: string
    conflictErrorMessage: string
  }) {
    this.emptyErrorMessage = options.emptyErrorMessage
    this.conflictErrorMessage = options.conflictErrorMessage
  }
  run<X, A extends any[]>(store: T, f: (...args: A) => X, ...args: A): X {
    if (this.storage.getStore()) {
      throw new Error(this.conflictErrorMessage)
    }
    return this.storage.run({ value: store }, f, ...args)
  }
  getStore(): T {
    const store = this.storage.getStore()
    if (!store) {
      throw new Error(this.emptyErrorMessage)
    }
    return store.value
  }
}

import {
  ExclusiveStorageConflictError,
  ExclusiveStorageEmptyError,
} from './errors'
import { StackLocalStorage } from './StackLocalStorage'

/**
 * Like a {@link StackLocalStorage}, but only allows one store to be set at a time.
 *
 * @example
 * ```
 * const store = new ExclusiveStackLocalStorage({
 *   emptyErrorMessage: 'Store is empty',
 *   conflictErrorMessage: 'Store is already set'
 * })
 * store.run(1, () => {
 *   console.log(store.getStore()) // 1
 *   store.run(2, () => { ... }) // throws 'Store is already set'
 * })
 * console.log(store.getStore()) // throws 'Store is empty'
 * ```
 * @public
 */
export class ExclusiveStackLocalStorage<T> {
  private emptyErrorMessage: string
  private conflictErrorMessage: string
  private storage = new StackLocalStorage<{ value: T } | undefined>(undefined)

  /**
   * Creates a new ExclusiveStackLocalStorage.
   *
   * @param options - the options
   */
  constructor(options: ExclusiveStackLocalStorageOptions) {
    this.emptyErrorMessage = options.emptyErrorMessage
    this.conflictErrorMessage = options.conflictErrorMessage
  }

  /**
   * Runs a function with a given store.
   *
   * @remarks
   * If the store is already set (i.e. if the run calls are nested),
   * it will throw an error with the `conflictErrorMessage` as the message.
   *
   * @param store - the local store
   * @param f - the function to run
   * @param args - the arguments to pass to the function
   * @returns - the return value of the function
   */
  run<X, A extends any[]>(store: T, f: (...args: A) => X, ...args: A): X {
    if (this.storage.getStore()) {
      throw new ExclusiveStorageConflictError(this.conflictErrorMessage)
    }
    return this.storage.run({ value: store }, f, ...args)
  }

  /**
   * Returns the current store.
   *
   * @remarks
   * If the store is not set, it will throw an error with the `emptyErrorMessage` as the message.
   */
  getStore(): T {
    const store = this.storage.getStore()
    if (!store) {
      throw new ExclusiveStorageEmptyError(this.emptyErrorMessage)
    }
    return store.value
  }
}

/**
 * Options for ExclusiveStackLocalStorage.
 * @public
 */
export interface ExclusiveStackLocalStorageOptions {
  /**
   * The error message to throw when the store is empty.
   */
  emptyErrorMessage: string
  /**
   * The error message to throw when the store is already set.
   */
  conflictErrorMessage: string
}

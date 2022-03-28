/**
 * A StackLocalStorage can be used to pass (thread) values (referred to as a “store”)
 * through synchronous call stacks. This can be helpful in eliminating
 * repetitive variable passing when creating DSLs.
 *
 * @example
 * ```
 * const store = new StackLocalStorage(0)
 * store.run(1, () => {
 *   console.log(store.getStore()) // 1
 * })
 * console.log(store.getStore()) // 0
 * ```
 * @public
 */
export class StackLocalStorage<T> {
  private currentStore: T
  /**
   * Creates a new StackLocalStorage.
   *
   * @param initialStore - the initial store
   */
  constructor(initialStore: T) {
    this.currentStore = initialStore
  }

  /**
   * Runs a function with a given store.
   *
   * @param store - the local store
   * @param f - the function to run
   * @param args - the arguments to pass to the function
   * @returns - the return value of the function
   */
  run<X, A extends any[]>(store: T, f: (...args: A) => X, ...args: A): X {
    const oldStore = this.currentStore
    this.currentStore = store
    try {
      return f(...args)
    } finally {
      this.currentStore = oldStore
    }
  }

  /**
   * Returns the current store.
   *
   * @remarks
   * If calls to `run` are nested, the innermost store is returned.
   *
   * @returns - the current store
   */
  getStore() {
    return this.currentStore
  }
}

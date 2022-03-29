/**
 * Thrown when an {@link ExclusiveStackLocalStorage} is being read while not set.
 * @public
 */
export class ExclusiveStorageEmptyError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ExclusiveStorageEmptyError'
  }
}

/**
 * Thrown when an {@link ExclusiveStackLocalStorage} is being set in a nested manner.
 * @public
 */
export class ExclusiveStorageConflictError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ExclusiveStorageConflictError'
  }
}

/**
 * A {@link StackLocalStorage} can be used to thread values through synchronous call stacks.
 *
 * An {@link ExclusiveStackLocalStorage} can be used to ensure that a given store is only
 * used once at a time. When getting value, it throws an error if the store is not set.
 * It also throws if the store is being set in a nested manner.
 *
 * These tools can be helpful in eliminating repetitive variable passing when creating DSLs.
 * See the respective classes for examples.
 *
 * @packageDocumentation
 */
export * from './StackLocalStorage'
export * from './ExclusiveStackLocalStorage'

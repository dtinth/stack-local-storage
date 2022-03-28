import { ExclusiveStackLocalStorage } from './ExclusiveStackLocalStorage'

it('throws if empty', () => {
  const storage = new ExclusiveStackLocalStorage<number>({
    conflictErrorMessage: 'conflict',
    emptyErrorMessage: 'empty',
  })
  expect(() => storage.getStore()).toThrow('empty')
})

it('throws if conflict', () => {
  const storage = new ExclusiveStackLocalStorage<number>({
    conflictErrorMessage: 'conflict',
    emptyErrorMessage: 'empty',
  })
  expect(() =>
    storage.run(1, () => storage.run(2, () => storage.getStore())),
  ).toThrow('conflict')
})

it('returns value if exists', () => {
  const storage = new ExclusiveStackLocalStorage<number>({
    conflictErrorMessage: 'conflict',
    emptyErrorMessage: 'empty',
  })
  expect(storage.run(3, () => storage.getStore())).toEqual(3)
})

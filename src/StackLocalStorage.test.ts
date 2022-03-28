import { StackLocalStorage } from './StackLocalStorage'

it('returns initial value when empty', () => {
  const storage = new StackLocalStorage(42)
  expect(storage.getStore()).toBe(42)
})

it('returns value passed to run', () => {
  const storage = new StackLocalStorage(42)
  expect(storage.run(1, () => storage.getStore())).toBe(1)
})

it('returns innermost value', () => {
  const storage = new StackLocalStorage('a')
  const log = []
  log.push(storage.getStore())
  storage.run('b', () => {
    log.push(storage.getStore())
    storage.run('c', () => {
      log.push(storage.getStore())
    })
    log.push(storage.getStore())
    try {
      storage.run('d', () => {
        log.push(storage.getStore())
        throw new Error('wtf')
      })
    } catch (e) {
      log.push(String(e))
    }
    log.push(storage.getStore())
  })
  log.push(storage.getStore())
  expect(log).toEqual(['a', 'b', 'c', 'b', 'd', 'Error: wtf', 'b', 'a'])
})

export const setFakeDate = (): void => {
  // new Date("Jan 1 2000 13:37:00").valueOf()
  const fakeNow = 946723020000

  // @ts-ignore
  // eslint-disable-next-line no-global-assign
  Date = class extends Date {
    // @ts-ignore
    constructor(...args) {
      if (args.length === 0) {
        super(fakeNow)
      } else {
        // @ts-ignore
        super(...args)
      }
    }
  }

  Date.now = () => fakeNow
}

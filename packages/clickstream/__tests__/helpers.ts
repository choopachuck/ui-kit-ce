export const mockGlobals = (): void => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      //eslint-disable-next-line
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
  Object.defineProperty(window, 'location', {
    value: {
      href: 'http://localhost/',
    },
    writable: true,
  })
  Object.defineProperty(globalThis, 'navigator', {
    value: {
      userAgent:
        'Mozilla/5.0 (linux) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/16.7.0',
    },
    writable: true,
  })
}

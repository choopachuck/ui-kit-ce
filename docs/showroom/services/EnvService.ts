export class EnvService {
  static get isProduction(): boolean {
    return process.env.NODE_ENV === 'production'
  }

  static get isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development'
  }

  static get isDist(): boolean {
    return window.location.host === ''
  }
}

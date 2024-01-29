const config = {
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000,
    retries: 2,
  },
}

module.exports = config

export default {
  verbose: true,
  roots: [ '.' ],
  setupFiles: [ './jest.config.env.ts' ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    `**/tests/**/*.+(spec|test).+(ts)`,
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
}

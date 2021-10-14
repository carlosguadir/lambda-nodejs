export default {
  verbose: true,
  roots: [ '.' ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    `**/tests/**/*.+(spec|test).+(ts)`,
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
}

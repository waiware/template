module.exports = {
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/src/**/+(*.)+(spec|test).+(ts|js)'],
  preset: 'ts-jest',
  testEnvironment: 'node', // ここを追記
  moduleNameMapper: {
    '~(.*)$': '<rootDir>/src/$1',
  },
};

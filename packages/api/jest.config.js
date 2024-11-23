module.exports = {
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  preset: 'ts-jest',
  testEnvironment: '@quramy/jest-prisma/environment', // ここを追記
  moduleNameMapper: {
    '~(.*)$': '<rootDir>/src/$1',
  },
};

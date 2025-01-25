module.exports = {
  moduleNameMapper: {
    '\\.module\\.css$': '<rootDir>/src/__mocks__/stylesMock.js',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFilesAfterEnv: [],
  collectCoverage: true,
  coverageReporters: ['text'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};

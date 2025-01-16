module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFilesAfterEnv: [],
  collectCoverage: true,
  coverageReporters: ['text'],
  reporters: [
    'default',
    ['jest-html-reporters', { publicPath: './test-report' }],
  ],
};

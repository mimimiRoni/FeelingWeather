export const preset = 'react';
export const transform = {
  '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
};
export const moduleFileExtensions = ['js', 'jsx', 'ts', 'tsx'];
export const setupFilesAfterEnv = ['@testing-library/jest-dom/extend-expect'];

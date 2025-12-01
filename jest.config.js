const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig')
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: [
    '<rootDir>/src'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  clearMocks: false,
  detectOpenHandles: true,
  verbose: true,
  coverageDirectory: '<rootDir>/coverage',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react' } }],
  },
  coverageReporters: ['json-summary', 'text', 'html', 'cobertura'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!src/setupTests.ts',
    '!src/index.tsx',
    '!src/testUtils.tsx',
    '!src/redux/hooks.ts'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/file.mock.js',
    '\\.(css|scss|less)$': '<rootDir>/style.mock.js',
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>',
    })
  },
};
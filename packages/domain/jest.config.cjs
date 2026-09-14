module.exports = {
  displayName: 'domain',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', { jsc: { target: 'es2022' } }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@chess/core$': '<rootDir>/../core/src/index.ts',
  },
  testMatch: ['**/*.test.ts'],
  clearMocks: true,
};

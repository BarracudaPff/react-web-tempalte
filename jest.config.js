module.exports = {
  roots: ["<rootDir>/src/", "<rootDir>/tests/"],

  coverageDirectory: "<rootDir>/tests/__coverage__/", //marked

  testMatch: [
    "<rootDir>/tests/**/__tests__/**/*.+(ts|tsx|js)",
    "<rootDir>/tests/**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$"], //marked
  moduleDirectories: ["node_modules", "."], //marked
  // setupFilesAfterEnv: ["jest-extended"],
  resetMocks: true,
  testEnvironment: "jsdom", //marked
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  setupFiles: ["<rootDir>/tests/__mocks__/shim.ts"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tests/__mocks__/fileMock.ts",
    "\\.(css|scss|less)$": "<rootDir>/tests/__mocks__/styleMock.ts"
  },
}

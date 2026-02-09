export default {
    testEnvironment: "node",
    transform: {},
    testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
    collectCoverageFrom: ["src/**/*.js", "!src/index.js"],
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov", "html"],
    testTimeout: 10000,
};

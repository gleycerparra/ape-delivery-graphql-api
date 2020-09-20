module.exports = {
    preset: 'ts-jest',
    roots: [
        "<rootDir>/src"
    ],
    moduleNameMapper: {
        "@app/(.*)$": "<rootDir>/src/$1"
    },
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    collectCoverageFrom: [
        "src/**/*.ts*"
    ],
    testEnvironment: "node"
}
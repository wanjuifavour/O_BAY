module.exports = {
    transform: {
        '^.+\\.js$': 'babel-jest'
    },
    moduleFileExtensions: ['js'],
    testEnvironment: 'node',
    setupFiles: ['jest-fetch-mock/setupJest']
};
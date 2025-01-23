module.exports = {
    preset: 'ts-puppeteer',
    testRegex: './*\\.test\\.js$',
    setupFilesAfterEnv: ['./setupTests.js'],
}
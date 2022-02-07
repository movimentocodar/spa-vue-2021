/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel'
};

module.exports = config;

// Or async function
module.exports = async () => {
  return {
    verbose: true,
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    testEnvironment: 'jsdom',
    transform: {
      "^.+\\.tsx?$": "ts-jest",
      ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"

    },
    "testURL": "http://localhost/",
  
    moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
      moduleNameMapper: {
            '^@/(.*)$': '<rootDir>/src/$1',
        }, 
     //   "testRegex": "Default: (/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
  
  }
};

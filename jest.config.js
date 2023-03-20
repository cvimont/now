// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(scss|css|less)$': '<rootDir>/fixCssJest.js'
  }
};

const fs = require('fs')
const path = require('path')

const restrictedPaths = [{ name: '@material-ui/core' }].map((pkg) =>
  fs.readdirSync(path.dirname(require.resolve(`${pkg.name}/package.json`))).map((component) => ({
    name: `${pkg.name}/${component}`,
    message: `This loads CommonJS version of the package. To fix replace with: import { ${component} } from "${pkg.name}";`,
  }))
)

// TODO Wait for https://github.com/facebook/create-react-app/pull/7036 to enable rules in react-scripts.

module.exports = {
  extends: 'eslint-config-react-app',
  rules: {
    // "no-script-url": "warn",
    'no-restricted-imports': ['error', { paths: [].concat(...restrictedPaths) }],
  },
}

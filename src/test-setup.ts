// tests/setup.ts
const tsConfig = require('../tsconfig.json')
import appRootPath from 'app-root-path'
import * as tsConfigPaths from 'tsconfig-paths'

console.log(tsConfig)
let cleanup: () => void

beforeAll(() => {
  cleanup = tsConfigPaths.register({
    baseUrl: appRootPath.path,
    paths: tsConfig.compilerOptions.paths
  });
});

afterAll(() => {
  cleanup();
});
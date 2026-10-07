const fs = require('node:fs')
const ts = require('typescript')
// Run the pure TypeScript domain modules with Node's built-in test runner.
require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8')
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true }, fileName: filename })
  module._compile(outputText, filename)
}

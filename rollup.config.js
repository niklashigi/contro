import typescript from 'rollup-plugin-typescript2'

const removeComments = () => ({
  transform(source) {
    return source.replace(/\/\*[^*]+\*\/\s+/g, '')
  }
})

const year = new Date().getFullYear()

const addBanner = () => ({
  renderChunk(source) {
    return `/*!
 * Contro
 * (c) ${year} Niklas Higi
 * Released under the MIT License.
 */
` + source
  }
})

export default {
  input: 'src/index.ts',
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: { module: 'es2015' },
      },
    }),
    removeComments(),
    addBanner(),
  ],
  output: [
    {
      format: 'umd',
      name: 'Contro',
      file: 'dist/contro.js',
      indent: '  ',
    },
    {
      format: 'es',
      file: 'dist/contro.esm.js',
      indent: '  ',
    },
  ],
}

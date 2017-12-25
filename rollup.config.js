import typescript from 'rollup-plugin-typescript'

const removeComments = () => ({
  transform(source, id) {
    return source.replace(/\/\*[^*]+\*\/\s+/g, '')
  }
})

const addBanner = () => ({
  transformBundle(source) {
    return `/*!
 * Contro
 * (c) 2017 Niklas Higi
 * Released under the MIT License.
 */
` + source
  }
})

export default {
  input: 'src/index.ts',
  plugins: [
    typescript({
      typescript: require('typescript'),
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

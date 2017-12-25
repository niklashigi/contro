import typescript from 'rollup-plugin-typescript'

const removeComments = () => ({
  transform(code, id) {
    code = code.replace(/\/\*[^*]+\*\/\s+/g, '')
    return { code, map: { mappings: '' } }
  }
})

export default {
  input: 'src/index.ts',
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    removeComments(),
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

import typescript from 'rollup-plugin-typescript'

export default {
  input: 'src/index.ts',
  plugins: [
    typescript({
      typescript: require('typescript'),
    })
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

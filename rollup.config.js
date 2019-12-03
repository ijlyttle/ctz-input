import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  input: 'build/index.js',
  output: {
    file: 'build/ctz-input.js',
    format: 'umd',
    name: 'ctzInput'
  },
  plugins: [nodeResolve({browser: true}), commonjs()]
};
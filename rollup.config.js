import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    file: 'build/ctz-input.js',
    format: 'umd',
    sourcemap: true,
    name: 'ctzInput'
  },
  plugins: [nodeResolve({browser: true}), commonjs(), json()]
};
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
  input: 'build/index.js',
  output: {
    file: 'build/ctz-input.js',
    format: 'umd',
    sourcemap: true,
    name: 'ctzInput'
  },
  plugins: [nodeResolve({browser: true}), commonjs(), sourcemaps()]
};
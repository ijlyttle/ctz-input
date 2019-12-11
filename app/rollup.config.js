import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import css from 'rollup-plugin-css-only'

export default {
  input: 'app/build/app/src/index.js',
  output: {
    file: 'app/build/app.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    nodeResolve({browser: true}), 
    commonjs(), 
    sourcemaps(),
    css({ output: 'app/build/app.css' })
  ]
};
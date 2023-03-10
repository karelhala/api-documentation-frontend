// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/main.ts',
  onwarn: ({message}) => {
    if (message.includes('`this` has been rewritten to `undefined`') || message.includes('keyword is equivalent to \'undefined\'')) {
      return;
    }

    console.error(message);
  },
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [
    json(),
    commonjs(),
    resolve({
      preferBuiltins: true
    }),
    typescript()
  ],
  external: [
      'prettier',
      '@apidevtools/swagger-parser'
  ]
};

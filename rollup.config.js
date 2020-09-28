/**
 * rollup.config.js
 * 
 * sobird<i@sobird.me> at 2020/09/14 14:27:43 created.
 */
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import vue from 'rollup-plugin-vue';
import scss from 'rollup-plugin-scss'
import json from '@rollup/plugin-json';
//import typescript from '@rollup/plugin-typescript';

import path from 'path';



export default {
  input: 'src/main.js',
  output: {
    dir: 'output',
    format: 'cjs',
  },
  plugins: [
    alias({
      entries: [
        { find: '@', replacement: path.resolve(__dirname, 'src') }
      ]
    }),
    commonjs({ requireReturnsDefault: true, include: /node_modules/ }),
    resolve({ jsnext: true, browser: true }),
    vue({ css: false }),
    json()
  ]
}

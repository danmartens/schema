import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

const input = 'src/index.ts';
const plugins = [commonjs(), typescript()];

export default [
  {
    input,
    output: {
      dir: 'lib',
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
    },
    plugins,
  },
];

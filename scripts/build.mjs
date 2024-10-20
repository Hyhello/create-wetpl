import { build } from 'esbuild';

// 构建
build({
    entryPoints: ['src/init.ts'],
    outfile: 'lib/index.cjs',
    bundle: true,
    minify: true,
    target: 'node14',
    platform: 'node'
});

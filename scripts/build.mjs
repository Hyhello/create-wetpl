import { build } from 'esbuild';

// 构建
build({
    entryPoints: ['src/init.ts'],
    outfile: 'lib/index.mjs',
    bundle: true,
    minify: true,
    format: 'esm',
    target: 'node14',
    platform: 'node'
    // external: ['giget', 'prompts']
});

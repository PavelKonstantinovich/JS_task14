const esbuild = require('esbuild')

esbuild.buildSync({
  entryPoints: ['./src/script.js'],
  bundle: true,
  outdir: 'dist',
})

const argv = require('yargs').argv;
const { BabelPlugin, CSSPlugin, EnvPlugin, FuseBox, PostCSSPlugin, SassPlugin, UglifyJSPlugin } = require('fuse-box');
const path = require('path');

const production = process.env.NODE_ENV === 'production';
const plugins = production 
    ? [require('autoprefixer'), require('cssnano'), require('lost')]
    : [require('lost')];

const fuse = FuseBox.init({
    homeDir: '',
    output: 'public/$name.js',
    plugins: [
        [ 
            SassPlugin(), 
            PostCSSPlugin(plugins),
            CSSPlugin({ 
                outFile: file => `./public/${file}`, 
                inject: production ? false : (file) => `/${file}`
            })
        ],
        EnvPlugin({ NODE_ENV: production ? 'production' : 'development' }),
        BabelPlugin(),
        production && UglifyJSPlugin()
    ]
});

fuse.bundle('vendor')
    .target('browser')
    .instructions(`~ index.js`);

fuse.dev({
    port: 5000,
    httpServer: false
});

fuse.bundle('bundle')
    .target('browser')
    .watch(`(index.js|styles/**.scss|styles/**/**.scss)`)
    .hmr()
    .instructions(`> [index.js]`);   


fuse.run();
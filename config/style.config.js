'use strict';
module.exports = {
    src: `${global.FRP_SRC}/sass/**/*.scss`,  // 読み込むscss
    dest: `${global.FRP_DEST}/assets/css`,  // 出力先
    outputStyle: 'compact',
    sourceMap: true,
    plugins: [  // postcssプラグイン
        require('autoprefixer')({   // autoprefixer(https://github.com/postcss/autoprefixer)
            browsers: [
              '> 3% in JP',
              'Android >= 4.2'
            ]
        })
    ],
    noGuide: false,
    styleguide: {
        title: 'StyleGuide',
        verbose: false,
        clean: true,
        params: {},
        css: `../${global.FRP_DEST}/assets/css/style.css`,
        // script: '../public/assets/js/app.js',
    }
};

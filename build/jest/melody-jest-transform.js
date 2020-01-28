// const bootstrap = require('../webpack/bootstrap');
// bootstrap('melody-jest-transform');

const { transformer } = require('melody-jest-transform');

// melody plugins
const { extension: CoreExtension } = require('melody-extension-core');
const MelodyIdomPlugin = require('melody-plugin-idom');

// Your configuration

const customConfig = {
    plugins: [
        {
            options: {
                iconMode: 'melody',
                babelCompatModuleHandling: true,
            },
        },
        CoreExtension,
        MelodyIdomPlugin,
    ],
    babel: {
        presets: [['env', { target: { node: 6 } }]],
        plugins: ['transform-flow-strip-types', 'transform-object-rest-spread'],
    },
};

// Don't change the name/signature of this function
exports.process = function(src, path) {
    return transformer(src, path, customConfig);
};

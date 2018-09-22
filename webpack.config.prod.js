const merge = require('webpack-merge')
const config = require('./webpack.config')

const wplib = [
    'blocks',
    'components',
    'date',
    'editor',
    'element',
    'i18n',
    'utils',
    'data',
]

const wplibExternals = wplib.reduce((externals, lib) => {
    externals[`@wordpress/${lib}`] = ['wp', lib]
    return externals
})

module.exports = merge(config, {
    mode: 'production',
    output: {
        library: ['wp', '[name]'],
        libraryTarget: 'window',
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        ...wplibExternals
    },
})

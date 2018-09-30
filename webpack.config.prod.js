const merge = require('webpack-merge')
const config = require('./webpack.config')

// Must be kept in sync with wordpress packages in package.json.
const wplib = [
    'blocks',
    'components',
    'editor',
]

const wplibExternals = wplib.reduce(
    (externals, lib) => {
        externals[`@wordpress/${lib}`] = ['wp', lib]
        return externals
    },
    {}
)

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

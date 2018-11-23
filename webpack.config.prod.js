const merge = require('webpack-merge')
const config = require('./webpack.config')

// Must be kept in sync with wordpress packages in package.json.
const wplib = [
    'blocks',
    'components',
    'editor',
    'element',
]

const wplibExternals = wplib.reduce(
    (externals, lib) => {
        externals[`@wordpress/${lib}`] = {
            window: ['wp', lib]
        }
        return externals
    },
    {}
)

module.exports = merge(config, {
    mode: 'production',
    output: {
        library: ['wp', 'persistentCheckboxes'],
        libraryTarget: 'window',
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        ...wplibExternals
    },
})

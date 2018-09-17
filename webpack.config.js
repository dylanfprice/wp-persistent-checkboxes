module.exports = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', {
                            targets: '> 0.25%, not dead',
                            useBuiltIns: 'usage'
                        }],
                        'react',
                    ]
                }
            }
        ]
    }
}

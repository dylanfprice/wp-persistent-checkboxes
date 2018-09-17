module.exports = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', {
                            targets: '> 0.25%, not dead',
                            useBuiltIns: 'usage'
                        }],
                        '@babel/preset-react',
                    ]
                }
            }
        ]
    }
}

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function(sassPaths) {
    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        publicPath: '../',
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: [ require('autoprefixer')() ]
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: { includePaths: sassPaths }
                            }
                        ]
                    })
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        publicPath: '../',
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: [ require('autoprefixer')() ]
                                }
                            }
                        ]
                    })
                },
            ]
        },
        plugins: [
            new ExtractTextPlugin('./css/[name].css')
        ]
    };
}
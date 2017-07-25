const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function(paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include: paths,
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
                            'sass-loader'
                        ]
                    })
                },
                {
                    test: /\.css$/,
                    include: paths,
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
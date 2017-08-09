const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer');
const cssNano = require('cssnano');
const cssMqpacker = require('css-mqpacker');

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
                                    plugins: [
                                        autoprefixer(),
                                        cssMqpacker(),
                                        cssNano()
                                    ]
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
                                    plugins: [
                                        autoprefixer(),
                                        cssMqpacker(),
                                        cssNano()
                                    ]
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

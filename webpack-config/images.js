module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'images/',
                                name: '[name].[ext]'
                            }
                        },
                        {
                            loader: 'image-webpack-loader'
                        }
                    ]
                    
                }
            ]
        }
    };
}
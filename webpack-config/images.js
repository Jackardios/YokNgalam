module.exports = function(paths, outputPath = 'images/') {
    return {
        module: {
            rules: [
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    include: paths,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: outputPath,
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

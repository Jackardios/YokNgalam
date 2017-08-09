module.exports = function(paths) {
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

module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include: paths,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                }
            ]
        }
    };
}
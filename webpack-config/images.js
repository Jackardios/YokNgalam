module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.(jpe?g|png|gif|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]'
                    }
                }
            ]
        }
    };
}
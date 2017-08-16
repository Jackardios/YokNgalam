/**
 * Import libs
 */
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

/**
 * includePaths
 */
const neatPaths = require("bourbon-neat").includePaths;
const normalizePaths = "./node_modules/normalize-scss/sass";

/**
 * Import plugins
 */
const HTMLWebpackPlugin = require("html-webpack-plugin");

/**
 * Import partial configurations
 */
const cssExtract = require("./webpack-config/cssExtract");
const devServer = require("./webpack-config/devServer");
const uglifyJS = require("./webpack-config/uglifyJS");
const svgSprites = require("./webpack-config/svgSprites");
const images = require("./webpack-config/images");
const fonts = require("./webpack-config/fonts");
const babel = require("./webpack-config/babel");
const sass = require("./webpack-config/sass");
const css = require("./webpack-config/css");
const pug = require("./webpack-config/pug");

/**
 * Paths
 * @type {Object}
 */
const PATHS = {
    src: path.join(__dirname, "src"),
    dist: path.join(__dirname, "dist"),
    entries: path.join(__dirname, "src/js/entries"),
    assets: path.join(__dirname, "src/assets"),
};

/**
 * Common configuration
 * @type {Object}
 */
const common = merge([
    {
        entry: {
            index: path.resolve(PATHS.entries, "index.js"),
        },
        output: {
            path: PATHS.dist,
            filename: "js/[name].js"
        },
        plugins: [
            new HTMLWebpackPlugin({
                filename: 'index.html',
                chunks: ['index', 'common'],
                template: path.resolve(PATHS.src, "pug/pages/index.pug")
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common'
            }),
            new webpack.ProvidePlugin({
                svgxuse: 'svgxuse'
            })
        ],
    },
    images([
        path.resolve(PATHS.assets, 'images')
    ]),
    fonts([
        path.resolve(PATHS.assets, 'fonts')
    ]),
    svgSprites({
        icons: path.resolve(PATHS.assets, 'icons')
    }),
    babel(),
    pug(),
]);

module.exports = function(env) {
    if (env === "production") {
        return merge([
            common,
            uglifyJS(),
            cssExtract([].concat(neatPaths, normalizePaths)),
        ]);
    } else {
        return merge([
            common,
            devServer(),
            sass([].concat(neatPaths, normalizePaths)),
            css(),
        ]);
    }
}

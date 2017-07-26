/**
 * Importing libs
 */
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const neatPaths = require("bourbon-neat").includePaths;
const bourbonPaths = require("bourbon").includePaths;

/**
 * Importing plugins
 */
const HTMLWebpackPlugin = require("html-webpack-plugin");

/**
 * Importing partial configurations
 */
const cssExtract = require("./webpack-config/cssExtract");
const devServer = require("./webpack-config/devServer");
const uglifyJS = require("./webpack-config/uglifyJS");
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
            })
        ],
    },
    images(),
    fonts(),
    babel(),
    pug(),
]);

module.exports = function(env) {
    if (env === "production") {
        return merge([
            common,
            uglifyJS(),
            cssExtract([].concat(neatPaths, bourbonPaths)),
        ]);
    } else {
        return merge([
            common,
            devServer(),
            sass([].concat(neatPaths, bourbonPaths)),
            css(),
        ]);
    }
}

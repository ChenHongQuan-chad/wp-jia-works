/*
 * @Description:
 * @Author: chad-Chen
 */
const webpack = require('webpack')
var path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const isDev = process.env.NODE_ENV === 'development'
plugins = [
    new webpack.ProvidePlugin({
        throttle: 'lodash.throttle'
    }),
    new webpack.LoaderOptionsPlugin({ minimize: true }),
    new MiniCssExtractPlugin({
        filename: 'styles.css'
    }),
    new VueLoaderPlugin()
]
if (!isDev) {
    plugins.push(
        new PrerenderSPAPlugin({
            // indexPath: path.join(__dirname, '../../src/App.vue'),
            staticDir: path.join(__dirname, '../../dist'),
            // Optional - The path your rendered app should be output to.
            // (Defaults to staticDir.)
            outputDir: path.join(__dirname, '../../prerendered'),
            indexPath: path.join(__dirname, '../../index.html'),
            routes: ['/', '/about', '/contact-us'],
            renderer: new Renderer({
                inject: {
                    foo: 'bar'
                },
                headless: true,
                renderAfterDocumentEvent: 'render-event'
            })
        })
    )
}

if (process.env.NODE_ENV === 'development') {
    plugins.push(require('./browser-sync'))
}

module.exports = plugins

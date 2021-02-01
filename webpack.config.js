const path = require('path');
const webpack = require('webpack');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	mode: 'development',

	entry: {
		index: './src/index.js',
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},

	devtool: 'source-map',

	module: {
		rules: [
			{
				test: /.(scss|css)$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: 'style-loader' },
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],

				test: /.jsX?$/,
				use: ['babel-loader'],
				exclude: /node_modules/,

				test: /.html$/,
				use: 'html-loader',
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({ template: './src/index.html' }),
		new webpack.ProgressPlugin(),
		new MiniCssExtractPlugin({ filename: 'main.[contenthash].css' }),
	],

	resolve: {
		extensions: ['.js'],
	},

	target: 'web',

	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		compress: true,
		hot: true,
		port: 5000,
	},

	optimization: {
		minimizer: [new TerserPlugin()],

		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/,
				},
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: false,
		},
	},
};

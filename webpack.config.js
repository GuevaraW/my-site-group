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

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',

	entry: {
		app: './src/app.js',
		loan: './src/js/loan.js',
	},

	output: {
		path: path.resolve(__dirname, 'docs'),
		filename: 'js/[name].js',
	},

	devtool: 'source-map',

	resolve: {
		extensions: ['.js'],
	},

	module: {
		rules: [
			{
				test: /.jsX?$/,
				use: ['babel-loader'],
				exclude: /node_modules/,
			},
			{
				test: /.(hbs|handlebars)$/,
				use: ['handlebars-loader'],
			},
			{
				test: /.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [['postcss-preset-env']],
							},
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /.(jpe?g|gif|png)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'images/',
							publicPath: '../images',
							useRelativePath: true,
						},
					},
				],
			},
		],
	},

	plugins: [
		new webpack.ProgressPlugin(),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/templates/index.hbs',
			chunks: ['app'],
		}),
	],

	target: 'web',

	devServer: {
		contentBase: 'docs',
		compress: true,
		port: 5000,
		hot: true,
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

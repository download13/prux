module.exports = [
	{
		entry: __dirname + '/examples/my-clock.js',
		output: {
			path: __dirname + '/examples',
			filename: 'my-clock.build.js'
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					query: {
						presets: ['babel-preset-es2015-native-modules'],
						plugins: [
							'babel-plugin-transform-object-rest-spread',
							'babel-plugin-transform-react-jsx'
						]
					}
				}
			]
		}
	}
];
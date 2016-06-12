module.exports = [
	{
		entry: __dirname + '/register-component.js',
		output: {
			path: __dirname + '/dist',
			filename: 'index.js'
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
							'babel-plugin-transform-object-rest-spread'
						]
					}
				}
			]
		}
	},
	{
		entry: __dirname + '/examples/my-clock.js',
		output: {
			path: __dirname + '/examples',
			filename: 'build.js'
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

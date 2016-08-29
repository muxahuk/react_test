'use strict';

const path = require( 'path' );

const NODE_ENV     = process.env.NODE_ENV || 'development';
const CONTEXT_PATH = path.join( __dirname, 'src', 'public' );
const SRC_PATH     = path.join( CONTEXT_PATH, 'js' );
const PUBLIC_PATH  = path.join( __dirname, 'public' );

module.exports = {
	context   : CONTEXT_PATH,
	entry     : path.join( SRC_PATH, 'script' ),
	output    : {
		path          : path.join( PUBLIC_PATH, 'js' ),
		publicPath    : 'js',
		filename      : "[name].js",
		chunkFilename : "[id].js",
		pathinfo      : NODE_ENV === 'development'
	},
	module    : {
		loaders : [
			{
				test    : /\.jsx?$/,
				include : SRC_PATH,
				loader  : "babel"
			}
		]
	},
	resolve   : {
		modulesDirectories : [ 'node_modules' ],
		extensions         : [ '', '.js', '.jsx' ]
	},
	externals : {
		'react'     : 'React',
		'react-dom' : 'ReactDOM'
	},
	devtool   : NODE_ENV !== 'development' ? 'cheap-source-map' : 'eval'
};
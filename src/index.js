'use strict';

import Express, { static as EStatic } from 'express';
import path from 'path';
import views from './views';

const App = new Express();

App.set( 'env', process.env.NODE_ENV || 'development' );
App.set( 'port', process.env.PORT || 3131 );
App.set( 'host', process.env.HOST || 'localhost' );
App.set( 'root', __dirname );
App.disable( 'x-powered-by' );

views( App, {
	test       : /.*/,
	components : {
		App : {
			file    : path.join( App.get( 'root' ), 'public', 'js', 'App' ),
			options : {}
		}
	}
} );
App.set( 'view engine', 'ejs' );
App.use( EStatic( path.join( App.get( 'root' ), '..', 'public' ) ) );

App.get( '/', ( req, res ) => {
	res.render( 'index' );
} );

App.listen( App.get( 'port' ), App.get( 'host' ), () => {
	console.log( '\r\n\r\n\tServer working on: http://' + App.get( 'host' ) + ':' + App.get( 'port' ) + '\r\n\r\n' );
} );
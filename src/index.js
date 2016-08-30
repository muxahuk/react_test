'use strict';

import Express, { static as EStatic } from 'express';
import path from 'path';
import views from './views';

const app = new Express();

app.set( 'env', process.env.NODE_ENV || 'development' );
app.set( 'port', process.env.PORT || 3131 );
app.set( 'host', process.env.HOST || 'localhost' );
app.set( 'root', __dirname );
app.disable( 'x-powered-by' );

views( app, {
	test       : /.*/,
	components : {
		App : {
			file    : path.join( app.get( 'root' ), 'public', 'js', 'App' ),
			options : {}
		}
	}
} );
app.set( 'view engine', 'ejs' );
app.use( EStatic( path.join( app.get( 'root' ), '..', 'public' ) ) );

app.get( '/', ( req, res ) => {
	res.render( 'index' );
} );

app.listen( app.get( 'port' ), app.get( 'host' ), () => {
	console.log( '\r\n\r\n\tServer working on: http://' + app.get( 'host' ) + ':' + app.get( 'port' ) + '\r\n\r\n' );
} );

require( './configs' );
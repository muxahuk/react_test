'use strict';

import { __express as render } from 'ejs';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

export default ( app, options = {} ) => {
	options.test       = options.test ? options.test : '/bot/i';
	options.components = options.components || {};
	app.use( ( req, res, next ) => {
		if( req.headers[ 'user-agent' ].match( options.test ) )
			res.locals.isBot = true;
		next();
	} );
	app.engine( 'ejs', ( file, locals, cb ) => { // define the template engine
		locals.react_html       = {};
		locals.react_components = locals.react_components || {};
		const components        = Object.assign( {}, options.components, locals.react_components );
		const keys              = Object.keys( components );
		if( locals.isBot && keys.length > 0 ) {
			keys.map( ( key ) => {
				locals.react_html[ key ] = '';
				const component          = components[ key ];
				try {
					const obj                = require( component.file );
					const Component          = obj && obj.__esModule ? obj.default : obj;
					locals.react_html[ key ] = renderToString(
						createElement( Component, component.options )
					);
				} catch( e ) {
					console.error( 'Error rendering react component:', component );
					console.error( e );
				}
			} );
		}
		render( file, locals, cb )
	} );
}
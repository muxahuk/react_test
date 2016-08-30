'use strict';

import fs from 'fs';

export function isObject( item ) {
	return (item && typeof item === 'object' && !Array.isArray( item ) && item !== null);
}

export function assignDeep( target, ...sources ) {
	sources.map( source => {
		if ( isObject( target ) && isObject( source ) ) {
			for ( const key in source ) {
				if ( isObject( source[ key ] ) ) {
					if ( !target[ key ] ) Object.assign( target, { [key] : {} } );
					assignDeep( target[ key ], source[ key ] );
				} else {
					Object.assign( target, { [key] : source[ key ] } );
				}
			}
		}
	} );
	return target;
}

export function readFile( filePath, encoding = 'utf8', parse = false ) {
	return new Promise( ( resolve, reject ) => {
		fs.access( filePath, fs.constants.F_OK, ( err ) => {
			if ( err ) return reject( err );
			fs.readFile( filePath, encoding, ( err, content ) => {
				if ( err ) return reject( err );
				if ( parse ) return resolve( JSON.parse( content ) );
				resolve( content );
			} );
		} );
	} );
}

'use strict';

import { assignDeep, readFile } from './utils';
import path from 'path';

const CONFIGS_FOLDER = path.join( __dirname, '..', 'configs' );

export function user() {
	return Promise
	.all( [
		readFile( path.join( CONFIGS_FOLDER, 'default.configs.json' ), undefined, true ),
		readFile( path.join( CONFIGS_FOLDER, 'user.configs.json' ), undefined, true )
	] )
	.then( configs => assignDeep( ...configs ) );
}

export function pages() {
	return readFile( path.join( CONFIGS_FOLDER, 'pages.configs.json' ), undefined, true )
	.then( pages => {

	} );
}
'use strict';

import { createElement } from 'react';
import { render } from 'react-dom';
import App from './App';

const data = {
	works : true
};

render( createElement( App, data ), document.getElementById( 'root' ) );


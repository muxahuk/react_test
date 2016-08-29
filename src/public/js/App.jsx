'use strict';

import React, { Component } from 'react';
import Header from './components/Header';

export default class App extends Component {
	constructor( ...args ) {
		super( ...args );
		this.state    = {
			color : 'blue'
		};
		this._onClick = this._onClick.bind( this );
	}

	_onClick() {
		this.setState( { color : this.state.color !== 'red' ? 'red' : 'blue' } );
	}

	render() {
		return (
			<div id="app">
				<Header />
				<p onClick={this._onClick} style={this.state}>It really works!!</p>
			</div>
		)
	}
}
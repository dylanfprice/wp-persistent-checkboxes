import React from 'react';

import { getValue, setValue } from './localStorage';

export default class PersistentCheckbox extends React.Component {
	constructor( props ) {
		super( props );
		this.state = (
			{ checked: getValue( this.getLocalStorageKey(), this.props.id ) || false }
		);
		this.onChange = this.onChange.bind( this );
	}

	getLocalStorageKey() {
		return 'PersistentCheckbox:' + window.location.pathname;
	}

	onChange( { target: { checked } } ) {
		setValue( this.getLocalStorageKey(), this.props.id, checked );
		this.setState( { checked } );
	}

	render() {
		const style = this.state.checked ? { textDecoration: 'line-through' } : {};
		return (
			<>
				<input
					id={ this.props.id }
					type="checkbox"
					onChange={ this.onChange }
					checked={ this.state.checked }
				/>
				<label style={ style } htmlFor={ this.props.id }>
					{ this.props.label }
				</label>
			</>
		);
	}
}

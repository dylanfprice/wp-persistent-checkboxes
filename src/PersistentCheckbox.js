import { Component } from '@wordpress/element';

import { getValue, setValue } from './localStorage';

/**
 * Renders a checkbox that persists its checked state in localStorage.
 * 
 * Props:
 *   id (string): The unique ID of the checkbox. Used as the localStorage key.
 *   label (React.Element): The label to display next to the checkbox.
 */
export default class PersistentCheckbox extends Component {
	constructor( props ) {
		super( props );
		this.state = (
			{ checked: getValue( this.getLocalStorageKey(), this.props.id ) || false }
		);
		this.onChange = this.onChange.bind( this );
	}

	getLocalStorageKey() {
		return 'PersistentCheckbox:' + document.location.pathname;
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

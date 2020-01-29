import { shallow } from 'enzyme';

import save, * as module from './save';

describe( 'save', () => {
	it( 'renders the checkboxes and inline script', () => {
		const labelObjects = [
			{ label: 'label one' },
			{ label: 'label two' },
			{ label: 'label three' },
		];
		const saveContent = save( {
			attributes: { labelObjects },
			className: 'test',
		} );
		expect( shallow( saveContent ) ).toMatchSnapshot();
	} );
} );

describe( 'getBlockId', () => {
	it( 'returns block id for given labels', () => {
		const actual = module.getBlockId( [ 'label one', 'label two' ] );
		expect( actual ).toBe(
			'wp-persistent-checkboxes-de0e1e73c6e1e2bb1e5870f76a0e84b8'
		);
	} );
} );

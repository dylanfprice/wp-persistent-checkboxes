import * as module from './index.js';

describe( 'parseLabels', () => {
	it( 'returns empty array when given empty string', () => {
		const actual = module.parseLabels( '' );
		expect( actual ).toEqual( [] );
	} );

	it( 'returns empty array when given empty label', () => {
		const actual = module.parseLabels( '<p></p>' );
		expect( actual ).toEqual( [] );
	} );

	it( 'returns array with two labels when given two labels', () => {
		const actual = module.parseLabels( '<p>Foo</p><p>Bar</p>' );
		expect( actual ).toEqual( [ 'Foo', 'Bar' ] );
	} );
} );

describe( 'getBlockId', () => {
	it( 'returns block id for given labels', () => {
		const actual = module.getBlockId( [ 'label one', 'label two' ] );
		expect( actual ).toBe(
			'wp-persistent-checkboxes-119de1efd33e2dc42f523f34eecee903'
		);
	} );
} );

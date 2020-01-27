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

import * as module from './localStorage';

test( 'getValue returns undefined for unset key', () => {
	const actual = module.getValue( 'test', 'test-key' );
	expect( actual ).toBeUndefined();
} );

test( 'getValue retrieves the value from setValue', () => {
	module.setValue( 'test', 'test-key', 'test-value' );
	const actual = module.getValue( 'test', 'test-key' );
	expect( actual ).toBe( 'test-value' );
} );

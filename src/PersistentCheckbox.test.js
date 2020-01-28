import React from 'react';
import { shallow } from 'enzyme';

import { getValue, setValue } from './localStorage';
import PersistentCheckbox from './PersistentCheckbox';

jest.mock( './localStorage' );

describe( 'PersistentCheckbox', () => {
	it( 'defaults to unchecked', () => {
		const checkbox = shallow(
			<PersistentCheckbox id="test" label="test" />
		);
		expect( checkbox.find( 'input' ).prop( 'checked' ) ).toBe( false );
	} );

	it( 'is checked after being checked', () => {
		const checkbox = shallow(
			<PersistentCheckbox id="test" label="test" />
		);
		checkbox.find( 'input' ).simulate( 'change', { target: { checked: true } } );
		expect( checkbox.find( 'input' ).prop( 'checked' ) ).toBe( true );
	} );

	it( 'retrieves checked value from local storage', () => {
		getValue.mockReturnValueOnce( true );
		const checkbox = shallow(
			<PersistentCheckbox id="test" label="test" />
		);
		expect( checkbox.find( 'input' ).prop( 'checked' ) ).toBe( true );
	} );
	it( 'sets checked value in local storage', () => {
		const checkbox = shallow(
			<PersistentCheckbox id="test" label="test" />
		);
		checkbox.find( 'input' ).simulate( 'change', { target: { checked: true } } );
		expect( setValue.mock.calls.length ).toBe( 1 );
	} );
} );

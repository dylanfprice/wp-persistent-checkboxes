import { RichText } from '@wordpress/block-editor';
import { shallow } from 'enzyme';

import edit from './edit';

describe( 'edit', () => {
	it( 'renders the RichText editor', () => {
		const labelObjects = [
			{ label: 'label one' },
			{ label: 'label two' },
			{ label: 'label three' },
		];
		const editComponent = shallow( edit( {
			attributes: { labelObjects },
			className: 'test',
		} ) );
		expect( editComponent ).toMatchSnapshot();
	} );

	it( 'sets content from label objects', () => {
		const editComponent = shallow( edit( {
			attributes: { labelObjects: [ { label: 'test label' } ] },
			className: 'test',
		} ) );
		const actual = editComponent.find( RichText ).prop( 'value' );
		expect( actual ).toBe( '<p>test label</p>' );
	} );

	it( 'updates label objects from content when content changes', () => {
		const setAttributes = jest.fn();
		const editComponent = shallow( edit( {
			attributes: { labelObjects: [] },
			className: 'test',
			setAttributes,
		} ) );
		editComponent.find( RichText ).simulate( 'change', '<p>test label</p>' );
		const expected = [
			[ { labelObjects: [ { label: 'test label' } ] } ],
		];
		expect( setAttributes.mock.calls ).toEqual( expected );
	} );
} );

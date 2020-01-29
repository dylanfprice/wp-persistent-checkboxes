import { shallow } from 'enzyme';
import { RawHTML } from '@wordpress/element';

import * as module from './deprecated';

describe( 'v0_0_1', () => {
	const v0_0_1 = module.v0_0_1;
	describe( 'save', () => {
		it( 'returns undefined if original content has <ol>', () => {
			const originalContent = `
        <div
          id="test"
          class="wp-block-persistent-checkboxes-persistent-checkboxes"
        >
          <ol><li>test</li></ol>
        </div>
      `;
			const actual = v0_0_1.save( {
				attributes: { originalContent },
			} );
			expect( actual ).toBeUndefined();
		} );
		it( 'returns undefined for <ol> with attributes', () => {
			const originalContent = `
        <div
          id="test"
          class="wp-block-persistent-checkboxes-persistent-checkboxes"
        >
          <ol id="test"><li>test</li></ol>
        </div>
      `;
			const actual = v0_0_1.save( {
				attributes: { originalContent },
			} );
			expect( actual ).toBeUndefined();
		} );
		it( 'returns original content if doesn\'t have <ol>', () => {
			const originalContent = [
				`<div
          id="test"
          class="wp-block-persistent-checkboxes-persistent-checkboxes"
        >`,
				'<div>test</div>',
				'</div>',
			].join( '' );
			const actual = shallow( v0_0_1.save( { attributes: { originalContent } } ) );
			const expected = shallow(
				<div id="test"
					className="wp-block-persistent-checkboxes-persistent-checkboxes"
				>
					<div>test</div>
				</div>
			);
			expect( actual.html() ).toEqual( expected.html() );
		} );
	} );
	describe( 'migrate', () => {
		it( 'transforms content into label objects', () => {
			const content = '<p>label one</p><p>label two</p><p>label three</p>';
			const actual = v0_0_1.migrate( { content } );
			const expected = {
				labelObjects: [
					{ label: 'label one' },
					{ label: 'label two' },
					{ label: 'label three' },
				],
			};
			expect( actual ).toEqual( expected );
		} );
	} );
} );

import React from 'react';
import { shallow } from 'enzyme';

import PersistentCheckboxList from './PersistentCheckboxList';

describe( 'PersistentCheckboxList', () => {
	it( 'renders a list of checkboxes', () => {
		const labels = [ 'label one', 'label two', 'label three' ];
		const checkboxes = shallow(
			<PersistentCheckboxList labels={ labels } />
		);
		expect( checkboxes ).toMatchSnapshot();
	} );
} );

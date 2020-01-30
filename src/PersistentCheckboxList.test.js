import { shallow } from 'enzyme';

import PersistentCheckboxList from './PersistentCheckboxList';

describe( 'PersistentCheckboxList', () => {
	it( 'renders a list of checkboxes', () => {
		const labels = [ 'label one', 'label two', 'label three' ];
		const checkboxes = <PersistentCheckboxList labels={ labels } />;
		expect( shallow( checkboxes ) ).toMatchSnapshot();
	} );
} );

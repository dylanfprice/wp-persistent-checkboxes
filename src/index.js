import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import edit from './edit';
import save from './save';
import deprecated from './deprecated';

export { render } from './save';

registerBlockType(
	'persistent-checkboxes/persistent-checkboxes',
	{
		title: __( 'Persistent Checkboxes', 'persistent-checkboxes' ),
		description: __(
			'Block showing a list of checkboxes and labels. When an end user ' +
      'checks a box it is remembered across refreshes in their browser.',
			'persistent-checkboxes',
		),
		icon: 'yes',
		category: 'widgets',
		attributes: {
			labelObjects: {
				type: 'array',
				source: 'query',
				default: [],
				selector: 'ol li',
				query: {
					label: {
						type: 'string',
						source: 'html',
						selector: 'label span',
					},
				},
			},
		},
		edit,
		save,
		deprecated,
	}
);

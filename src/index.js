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
			'Create a list of checkboxes. When a user checks a box the item is ' +
      'crossed off. Which items are crossed off is remembered on their device.',
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

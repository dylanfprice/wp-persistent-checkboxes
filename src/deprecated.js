import { RawHTML } from '@wordpress/element';

import parseLabels from './parseLabels';

export const v0_0_1 = {
	attributes: {
		content: { type: 'string' },
		originalContent: {
			type: 'string',
			source: 'html',
		},
	},
	save: ( { attributes: { originalContent } } ) => {
		const className = 'wp-block-persistent-checkboxes-persistent-checkboxes';
		const doc = new DOMParser().parseFromString( originalContent, 'text/html' );
		const element = doc.querySelector( `.${ className }` );
		const isOldFormat = element.querySelector( 'ol' ) === null;
		if ( isOldFormat ) {
			return (
				<div
					id={ element.id }
					className={ className }
					dangerouslySetInnerHTML={ { __html: element.innerHTML } }
				>
				</div>
			);
		}
	},
	migrate: ( { content } ) => {
		const labelObjects = parseLabels( content ).map( ( label ) => {
			return { label };
		} );
		return { labelObjects };
	},
};

const deprecated = [ v0_0_1 ];
export default deprecated;

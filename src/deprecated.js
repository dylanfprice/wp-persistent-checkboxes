import parseLabels from './parseLabels';

export const V0_0_1 = {
	attributes: {
		content: { type: 'string' },
		originalContent: {
			type: 'string',
			source: 'html',
		},
	},
	save: ( { attributes: { originalContent } } ) => {
		const className = 'wp-block-persistent-checkboxes-persistent-checkboxes';
		const doc = new window.DOMParser().parseFromString( originalContent, 'text/html' );
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

const deprecated = [ V0_0_1 ];
export default deprecated;

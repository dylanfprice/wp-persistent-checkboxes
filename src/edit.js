import { RichText } from '@wordpress/block-editor';

import parseLabels from './parseLabels';

export default function	edit( { attributes: { labelObjects }, className, setAttributes } ) {
	const content = (
		labelObjects.map( ( { label } ) => `<p>${ label }</p>` ).join( '' )
	);
	const style = `
      .${ className } p:before {content: "\u2610 ";}
      .${ className } p {margin-bottom: 0 !important;}
    `;
	return (
		<div className={ className }>
			<style>{ style }</style>
			<RichText
				multiline="p"
				value={ content }
				onChange={ ( content ) => setAttributes( {
					labelObjects: parseLabels( content ).map( ( label ) => {
						return { label };
					} ),
				} ) }
			/>
		</div>
	);
}

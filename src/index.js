import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';
import md5 from 'md5';
import ReactDOM from 'react-dom';
import React from 'react';

import PersistentCheckboxList from './PersistentCheckboxList';

registerBlockType( 'persistent-checkboxes/persistent-checkboxes', {
	title: 'Persistent Checkboxes',
	description: (
		'Block showing a list of checkboxes and labels. When an end user ' +
    'checks a box it is remembered across refreshes in their browser.'
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
	edit: ( { attributes: { labelObjects }, className, setAttributes } ) => {
		const content = (
			labelObjects.map( ( { label } ) => `<p>${ label }</p>` ).join()
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
	},
	save: ( { attributes: { labelObjects }, className } ) => {
		const labels = labelObjects.map( ( { label } ) => label );
		const script = (
			`window.addEventListener('load', function(event) {
         persistentCheckboxes.render(${ JSON.stringify( { labels } ) })
       });`
		);
		return (
			<div id={ getBlockId( labels ) } className={ className }>
				<PersistentCheckboxList labels={ labels } />
				<script dangerouslySetInnerHTML={ { __html: script } }></script>
			</div>
		);
	},
} );

export function parseLabels( content ) {
	const doc = new DOMParser().parseFromString( content, 'text/html' );
	let labels = (
		Array.from( doc.getElementsByTagName( 'p' ) )
			.map( ( p ) => p.innerHTML )
	);
	if ( labels[ labels.length - 1 ] === '' ) {
		labels = labels.slice( 0, -1 );
	}
	return labels;
}

export function getBlockId( labels ) {
	return `wp-persistent-checkboxes-${ md5( labels.join() ) }`;
}

export function render( { labels } ) {
	ReactDOM.render(
		<PersistentCheckboxList labels={ labels } />,
		document.getElementById( getBlockId( labels ) )
	);
}

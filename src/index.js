import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';
import md5 from 'md5';
import ReactDOM from 'react-dom';
import React from 'react';

import PersistentCheckbox from './PersistentCheckbox';

registerBlockType( 'persistent-checkboxes/persistent-checkboxes', {
	title: 'Persistent Checkboxes',
	description: (
		'Block showing a list of checkboxes and labels. When an end user ' +
    'checks a box it is remembered across refreshes in their browser.'
	),
	icon: 'yes',
	category: 'widgets',
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			multiline: 'span',
			selector: 'label',
		},
		labelObjects: {
			type: 'array',
			source: 'query',
			default: [],
			selector: 'ul',
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
		console.log( 'edit' );
		console.log( labelObjects );
		console.log( content );
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
		return (
			<div className={ className }>
				<PersistentCheckboxList
					labels={ labelObjects.map( ( { label } ) => label ) }
				/>
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

export function PersistentCheckboxList( { labels } ) {
	console.log( 'PersistentCheckboxList' );
	console.log( labels );
	const listId = `list-${ md5( labels.join() ) }`;
	const style = { listStyleType: 'none', marginLeft: 0 };
	return (
		<ol id={ listId } style={ style }>
			{ labels.map( ( label ) => {
				const id = `${ listId }-checkbox-${ md5( label ) }`;
				const labelElement = <RichText.Content tagName="span" value={ label } />;
				return (
					<li>
						<PersistentCheckbox id={ id } label={ labelElement } />
					</li>
				);
			} ) }
		</ol>
	);
}

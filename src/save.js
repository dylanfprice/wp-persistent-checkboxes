import { render as reactDOMRender } from '@wordpress/element';
import md5 from 'md5';

import PersistentCheckboxList from './PersistentCheckboxList';

export default function save( { attributes: { labelObjects }, className } ) {
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
}

export function getBlockId( labels ) {
	return `wp-persistent-checkboxes-${ md5( labels.join( '' ) ) }`;
}

export function render( { labels } ) {
	reactDOMRender(
		<PersistentCheckboxList labels={ labels } />,
		document.getElementById( getBlockId( labels ) )
	);
}

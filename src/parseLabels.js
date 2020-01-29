export default function parseLabels( content ) {
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

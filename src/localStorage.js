function getObject( objectKey ) {
	return JSON.parse( localStorage.getItem( objectKey ) ) || {};
}

export function setValue( objectKey, key, value ) {
	const object = getObject( objectKey );
	object[ key ] = value;
	localStorage.setItem( objectKey, JSON.stringify( object ) );
}

export function getValue( objectKey, key ) {
	const object = getObject( objectKey );
	return object[ key ];
}

import md5 from 'md5';

import PersistentCheckbox from './PersistentCheckbox';

/**
 * Renders a list of PersistentCheckbox components.
 *
 * Props:
 *   labels (string[]): An array of labels to render checkboxes for.
 */
export default function PersistentCheckboxList( { labels } ) {
	const listId = `list-${ md5( labels.join( '' ) ) }`;
	const style = { listStyleType: 'none', marginLeft: 0 };
	return (
		<ol style={ style }>
			{ labels.map( ( label ) => {
				const id = `${ listId }-checkbox-${ md5( label ) }`;
				const labelElement = (
					<span dangerouslySetInnerHTML={ { __html: label } }></span>
				);
				return (
					<li key={ id }>
						<PersistentCheckbox id={ id } label={ labelElement } />
					</li>
				);
			} ) }
		</ol>
	);
}

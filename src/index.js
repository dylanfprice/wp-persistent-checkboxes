import md5 from 'md5'
import ReactDOM from 'react-dom'
import React from 'react'
import {registerBlockType} from '@wordpress/blocks'
import {RichText} from '@wordpress/editor'

import PersistentCheckboxList from './PersistentCheckboxList'

const LABEL_SELECTOR = '.components-checkbox-control__label'

registerBlockType('persistent-checkboxes/persistent-checkboxes', {
    title: 'Persistent Checkboxes',
    description: (
        'Block showing a list of checkboxes and labels. When an end user ' +
        'checks a box it is remembered across refreshes in their browser.'
    ),
    icon: 'yes',
    category: 'widgets',
    attributes: {
        labels: {
            type: 'array',
            source: 'children',
            selector: LABEL_SELECTOR,
        },
    },
    edit: ({className, attributes: {labels = ['Edit me!']}, setAttributes}) => {
        const checkboxes = <PersistentCheckboxList labels={labels} persist={false} />
        return (
            <div className={className}>
                <RichText
                    value={checkboxes}
                    onChange={checkboxes =>
                        setAttributes({labels: checkboxes.map(extractLabel)})
                    }
                />
            </div>
        )
    },
    save: (props) => {
        const {attributes: {labels}} = props
        const blockId = hashLabels(labels)
        const checkboxes = <PersistentCheckboxList labels={labels} />
        return (
            <div id={blockId} className={props.className}>
                {checkboxes}
                <script>
                    window.wp.persistentCheckboxes.render({JSON.stringify(props.attributes)})
                </script>
            </div>
        )
    },
})

function extractLabel (checkboxControl) {
    return checkboxControl['props']['children'][0]['props']['children'][1]['props']['children'][0]
}

function hashLabels (labels) {
    return md5(labels.join('\n'))
}

export function render (props) {
    const checkboxes = React.createElement(PersistentCheckboxList, props)
    const blockId = hashLabels(props.attributes.labels)
    ReactDOM.render(checkboxes, document.getElementById(blockId))
}

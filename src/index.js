import md5 from 'md5'
import ReactDOM from 'react-dom'
import React from 'react'
import {registerBlockType} from '@wordpress/blocks'
import {RichText} from '@wordpress/editor'
import {renderToString} from '@wordpress/element'

import PersistentCheckboxList from './PersistentCheckboxList'

registerBlockType('persistent-checkboxes/persistent-checkboxes', {
    title: 'Persistent Checkboxes',
    description: (
        'Block showing a list of checkboxes and labels. When an end user ' +
        'checks a box it is remembered across refreshes in their browser.'
    ),
    icon: 'yes',
    category: 'widgets',
    attributes: {
        labels: {type: 'array'},
    },
    edit: ({attributes: {labels = [[]]}, className, setAttributes}) => {
        const value = (
            <ul style={{listStyleType: 'square'}}>
                {labels.map((label, index) => <li key={index}>{label}</li>)}
            </ul>
        )
        return (
            <RichText
                className={className}
                multiline='li'
                value={value}
                onChange={content => {
                    const labels = (
                        findObjects(content, 'type', 'li')
                            .map(li => li.props.children)
                    )
                    setAttributes({labels})
                }}
            />
        )
    },
    save: (props) => {
        const {attributes: {labels = []}, className} = props
        const blockId = generateBlockId(labels)
        const labelContents = labels.map((value, index) => (
            <RichText.Content key={index} tagName='span' value={value} />
        ))
        const checkboxes = <PersistentCheckboxList labels={labelContents} />
        const renderProps = {labels, blockId}
        return (
            <div id={blockId} className={className}>
                {checkboxes}
                <script>
                    window.wp.persistentCheckboxes.render({JSON.stringify(renderProps)})
                </script>
            </div>
        )
    },
})

function findObjects (obj, targetProp, targetValue) {
    let results = []

    function _findObjects (theObject) {
        if (theObject instanceof Array) {
            theObject.forEach(_findObjects)
        } else {
            for (let prop in theObject) {
                if (theObject.hasOwnProperty(prop)) {
                    let value = theObject[prop]
                    if (prop === targetProp && value === targetValue) {
                        results.push(theObject)
                    }
                    if (value instanceof Object || value instanceof Array) {
                        _findObjects(value)
                    }
                }
            }
        }
    }

    _findObjects(obj)

    return results
}

function generateBlockId (labels) {
    return `wp-persistent-checkboxes-${md5(labels.join('\n'))}`
}

export function render (props) {
    const {labels, blockId} = props
    const labelContents = labels.map((value, index) => (
        <span
            key={index}
            dangerouslySetInnerHTML={{__html: renderToString(value)}}
        ></span>
    ))
    const checkboxes = <PersistentCheckboxList labels={labelContents} />
    ReactDOM.render(checkboxes, document.getElementById(blockId))
}

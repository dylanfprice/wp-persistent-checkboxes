import md5 from 'md5'
import ReactDOM from 'react-dom'
import React from 'react'
import {registerBlockType} from '@wordpress/blocks'
import {RichText} from '@wordpress/editor'

import PersistentCheckboxList from './PersistentCheckboxList'

registerBlockType('persistent-checkboxes/persistent-checkboxes', {
    title: 'Persistent Checkboxes',
    description: (
        'Block showing a list of checkboxes and labels. When an end user ' +
        'checks a box it is remembered across refreshes in their browser.'
    ),
    icon: 'yes',
    category: 'widgets',
    align: false,
    attributes: {
        content: {type: 'string'},
    },
    edit: ({attributes: {content}, className, setAttributes}) => {
        return (
            <RichText
                className={className}
                multiline='p'
                value={content}
                onChange={content => setAttributes({content})}
            />
        )
    },
    save: (props) => {
        const {attributes: {content}, className} = props

        const doc = new window.DOMParser().parseFromString(content, 'text/html')
        const labels = (
            Array.from(doc.getElementsByTagName('p'))
                .map(p => p.innerHTML)
        )

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

function generateBlockId (labels) {
    return `wp-persistent-checkboxes-${md5(labels.join('\n'))}`
}

export function render (props) {
    const {labels, blockId} = props
    const labelContents = labels.map((value, index) => {
        const doc = new window.DOMParser().parseFromString(value, 'text/html')
        return <span
            key={index}
            dangerouslySetInnerHTML={{__html: doc.documentElement.textContent}}
        ></span>
    })
    const checkboxes = <PersistentCheckboxList labels={labelContents} />
    ReactDOM.render(checkboxes, document.getElementById(blockId))
}

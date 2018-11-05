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
    attributes: {
        labels: {
            source: 'query',
            selector: 'label',
            query: {label: {source: 'text'}}
        },
    },
    edit: ({attributes: {labels = [{label: 'Edit me!'}, {label: 'ok'}]}, className, setAttributes}) => {
        setAttributes({labels})
        const checkboxes = (
            <PersistentCheckboxList
                labels={getLabelStrings(labels)}
                persist={false}
            />
        )
        console.log('edit', labels, checkboxes)
        const newCheckbox = () => {
            // TODO: get new checkbox to show up right away
            labels.push({label: 'Edit me!'})
            console.log('newCheckbox', labels)
            setAttributes({labels})
        }
        return (
            <div className={className}>
                <RichText
                    value={checkboxes}
                    onChange={([newCheckboxes]) => {
                        setAttributes({labels: extractLabels(newCheckboxes)})
                    }}
                />
                <input id='new-checkbox' type='checkbox' disabled={true} onClick={newCheckbox} ></input>
                <label htmlFor='new-checkbox' onClick={newCheckbox} style={{color: 'rgba(51,51,51,.5)'}}>{'Add...'}</label>
            </div>
        )
    },
    save: (props) => {
        const {attributes: {labels = []}, className} = props
        const blockId = generateBlockId(labels)
        const checkboxes = (
            <PersistentCheckboxList labels={getLabelStrings(labels)} />
        )
        const value = (
            <div id={blockId} className={className}>
                {checkboxes}
                <script>
                    window.wp.persistentCheckboxes.render({JSON.stringify(props.attributes)})
                </script>
            </div>
        )
        return value
    },
})

function extractLabels (checkboxList) {
    // TODO: deal with delete case
    console.log('extractLabels', checkboxList)
    const checkboxes = checkboxList['props']['children']
    return checkboxes.map(checkbox => {
        const elements = checkbox['props']['children']
        const label = elements[1]
        const {props: {children: [innerText]}} = label
        return {label: innerText}
    })
}

function getLabelStrings (labels) {
    return labels.map(label => label['label'])
}

function generateBlockId (labels) {
    const labelStrings = getLabelStrings(labels)
    return `wp-persistent-checkboxes-${md5(labelStrings.join('\n'))}`
}

export function render (props) {
    const checkboxes = (
        <PersistentCheckboxList labels={getLabelStrings(props.labels)} />
    )
    const blockId = generateBlockId(props.labels)
    ReactDOM.render(checkboxes, document.getElementById(blockId))
}

import {CheckboxControl} from '@wordpress/components'
import md5 from 'md5'
import React from 'react'
import {registerBlockType} from '@wordpress/blocks'
import {RichText} from '@wordpress/editor'

const LABEL_SELECTOR = '.components-checkbox-control__label'

registerBlockType('persistent-checkboxes/persistent-checkboxes', {
    title: 'Persistent Checkboxes',
    description: (
        'Block showing a list of checkboxes and labels. When an end user ' +
        'checks a box it is remembered across refreshes in their browser.'
    ),
    icon: '',
    category: '',
    attributes: {
        labels: {
            type: 'array',
            source: 'children',
            selector: LABEL_SELECTOR,
        },
    },
    edit: ({className, attributes: {labels}, setAttributes}) => {
        const checkboxes = labels.map(label =>
            <CheckboxControl
                key={label}
                label={label}
                checked={false}
            />
        )
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
    save: ({className, attributes: {labels}}) => {
        const listId = `list-${md5(labels.join('\n'))}`

        const checkboxes = labels.map((label) => {
            const checkboxId = `${listId}-checkbox-${md5(label)}`
            return (
                <CheckboxControl
                    key={label}
                    label={label}
                    checked={isChecked(checkboxId)}
                    onChange={checked =>
                        onChangeCheckboxControl(checkboxId, checked)
                    }
                />
            )
        })

        return (
            <div className={className}>
                <RichText.Content value={checkboxes} />
            </div>
        )
    },
})

function extractLabel (checkboxControl) {
    return checkboxControl.querySelector(LABEL_SELECTOR).innerHTML
}

function getKey () {
    return 'checkbox-persist:' + window.location.pathname
}

function getCheckboxValues () {
    return JSON.parse(window.localStorage.getItem(getKey())) || {}
}

function saveCheckboxValues (checkboxValues) {
    window.localStorage.setItem(getKey(), JSON.stringify(checkboxValues))
}

function onChangeCheckboxControl (id, checked) {
    let checkboxValues = getCheckboxValues()
    checkboxValues[id] = checked
    saveCheckboxValues(checkboxValues)
}

function isChecked (id) {
    let checkboxValues = getCheckboxValues()
    return checkboxValues[id]
}

import {CheckboxControl} from '@wordpress/components'
import md5 from 'md5'
import ReactDOM from 'react-dom'
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
    save: (props) => {
        const {attributes: {labels}} = props
        const listId = getListId(labels)
        return (
            <div id={listId}>
                <script>
                    window.wp.persistentCheckboxes.render({JSON.stringify(props)})
                </script>
            </div>
        )
    },
})

function extractLabel (checkboxControl) {
    return checkboxControl['props']['children'][0]['props']['children'][1]['props']['children'][0]
}

export function render (props) {
    const element = React.createElement(PersistentCheckboxList, props)
    const listId = getListId(props.attributes.labels)
    ReactDOM.render(element, document.getElementById(listId))
}

class PersistentCheckboxList extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
        const {className, attributes: {labels}} = this.props
        const listId = getListId(labels)

        const checkboxes = labels.map(label => {
            const checkboxId = `${listId}-checkbox-${md5(label)}`
            const checked = isChecked(checkboxId)
            const style = checked ? {textDecoration: 'line-through'} : {}
            return (
                <CheckboxControl
                    key={checkboxId}
                    style={style}
                    label={label}
                    checked={checked}
                    onChange={checked => {
                        onChangeCheckboxControl(checkboxId, checked)
                    }}
                />
            )
        })
        return (
            <div className={className}>
                {checkboxes}
            </div>
        )
    }
}

class PersistentCheckbox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {checked: true}
        this.onChange = this.onChange.bind(this);
    }

    onChange(checked) {
        const checkboxId = this.props.id
        let checkboxValues = getCheckboxValues()
        checkboxValues[id] = checked
        saveCheckboxValues(checkboxValues)

    }

    render () {
        const checked = isChecked(this.props.id)
        const style = checked ? {textDecoration: 'line-through'} : {}
        return (
            <CheckboxControl
                style={style}
                label={this.props.label}
                checked={checked}
                onChange={this.onChange}
            />
        )
    }
}

function getListId (labels) {
    return `list-${md5(labels.join('\n'))}`
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
}

function isChecked (id) {
    let checkboxValues = getCheckboxValues()
    return checkboxValues[id]
}

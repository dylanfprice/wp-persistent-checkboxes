import md5 from 'md5'
import PropTypes from 'prop-types'
import React from 'react'

import {getValue, setValue} from './localStorage'

export default class PersistentCheckboxList extends React.Component {
    render () {
        const {labels} = this.props
        const listId = `list-${md5(labels.join('\n'))}`

        const checkboxes = labels.map(label => {
            const id = `${listId}-checkbox-${md5(label)}`
            return (
                <PersistentCheckbox
                    key={id}
                    id={id}
                    label={label}
                    persist={this.props.persist}
                />
            )
        })
        return (
            <div>
                {checkboxes}
            </div>
        )
    }
}

PersistentCheckboxList.propTypes = {
    labels: PropTypes.array.isRequired,
    persist: PropTypes.bool,
}

PersistentCheckboxList.defaultProps = {
    persist: true,
}

class PersistentCheckbox extends React.Component {
    constructor (props) {
        super(props)
        this.state = (
            this.props.persist
                ? {checked: getValue(this.getLocalStorageKey(), this.props.id)}
                : {checked: false}
        )
        this.onChange = this.onChange.bind(this)
    }

    getLocalStorageKey () {
        return 'checkbox-persist:' + window.location.pathname
    }

    onChange ({target: {checked}}) {
        if (this.props.persist) {
            setValue(this.getLocalStorageKey(), this.props.id, checked)
        }
        this.setState({checked: checked})
    }

    render () {
        const style = this.state.checked ? {textDecoration: 'line-through'} : {}
        return (
            <div>
                <input
                    id={this.props.id}
                    type="checkbox"
                    onChange={this.onChange}
                    checked={this.state.checked}
                />
                <label style={style} htmlFor={this.props.id}>
                    {this.props.label}
                </label>
            </div>
        )
    }
}

PersistentCheckbox.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    persist: PropTypes.bool,
}

PersistentCheckbox.defaultProps = {
    persist: true,
}

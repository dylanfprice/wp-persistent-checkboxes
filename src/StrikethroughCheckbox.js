import PropTypes from 'prop-types'
import React from 'react'

/* TODO: put React, @wordpress, etc. dependencies as externals in production */
export default class StrikethroughCheckbox extends React.Component {
    render () {
        let style = this.props.checked ? {textDecoration: 'line-through'} : {}
        return (
            <div>
                <input type="checkbox" id={this.props.id} checked={this.props.checked} />
                <label htmlFor={this.props.id} style={style}>{this.props.label}</label>
            </div>
        )
    }
}

StrikethroughCheckbox.propTypes = {
    id: PropTypes.string,
    checked: PropTypes.bool,
    label: PropTypes.string,
}

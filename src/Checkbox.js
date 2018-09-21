import React from 'react'

export default class StrikethroughCheckbox extends React.Component {
    render () {
        return (
            <div>
                <input id="test" className="checkbox-input" type="checkbox"/>
                <label htmlFor="test" className="checkbox-label">Test</label>
            </div>
        )
    }
}

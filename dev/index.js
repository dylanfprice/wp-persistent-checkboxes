import React from 'react'
import ReactDOM from 'react-dom'

import StrikethroughCheckbox from '../src/StrikethroughCheckbox'

ReactDOM.render(
    <div>
        <StrikethroughCheckbox id="1" checked={true} label="Test" />
        <StrikethroughCheckbox id="2" checked={false} label="Test" />
    </div>,
    document.querySelector('#devApp')
)

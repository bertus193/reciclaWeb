import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';

const MyTextField = ({ source, source2, record = {}, elStyle }) => {
    var output = null
    if (source != null) {
        output = get(record, source)
    }
    if ((output === null || output === '') && source2 != null) {
        output = get(record, source2)
    }
    return <span style={elStyle}>{
        output
    }</span>;
};

MyTextField.propTypes = {
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

export default MyTextField;
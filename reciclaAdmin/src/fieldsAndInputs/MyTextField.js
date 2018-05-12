import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import pure from 'recompose/pure';

const TextField = ({ source, source2, record = {}, elStyle }) => {
    var output = null
    if (source != null) {
        output = source
    }
    else if (source2 != null) {
        output = source2
    }
    return <span style={elStyle}>{
        get(record, output)
    }</span>;
};

TextField.propTypes = {
    addLabel: PropTypes.bool,
    elStyle: PropTypes.object,
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

const PureTextField = pure(TextField);

PureTextField.defaultProps = {
    addLabel: true,
};

export default PureTextField;
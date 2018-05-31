import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';

const TextImageField = ({ source, source2, source3, record = {} }) => {
    var name = null
    if (source != null) {
        name = get(record, source)
    }
    if ((name === null || name === '') && source3 != null) {

        name = get(record, source3)
    }
    return <span>
        <img className="avatarImage" alt="" src={record[source2]} onError={(e) => e.target.src = ""}></img>
        <span>{name}</span>
    </span>
};

TextImageField.propTypes = {
    addLabel: PropTypes.bool,
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

TextImageField.defaultProps = {
    addLabel: true,
};

export default TextImageField;
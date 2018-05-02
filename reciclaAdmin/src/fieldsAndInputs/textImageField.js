import React from 'react';
import PropTypes from 'prop-types';

const TextImageField = ({ source, source2, record = {} }) =>
    <span>
        <img className="avatarImage" alt="" src={record[source2]} onError={(e) => e.target.src = ""}></img>
        <span>{record[source]}</span>
    </span>;

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
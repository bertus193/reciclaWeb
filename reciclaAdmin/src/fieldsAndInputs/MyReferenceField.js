import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import get from 'lodash.get';
import muiThemeable from 'material-ui/styles/muiThemeable';
import compose from 'recompose/compose';
import LinearProgress from 'material-ui/LinearProgress';

var hideLoadingBar = false

const getStyles = muiTheme => ({
    link: {
        color: muiTheme.palette.accent1Color,
    },
});


// CUSTOM FUNCTIONS

function mapStateToProps(state, props) {

    var source = get(props.record, props.source);
    var sourceName = props.source

    if (source != null && !Number.isInteger(source)) {
        if (source.id != null) {
            sourceName += ".id"
        }
    }

    return {
        referenceRecord:
            state.admin.resources[props.reference].data[
            get(props.record, sourceName)
            ],
    };
}

// END CUSTOM FUNCTIONS

const linkToRecord = (basePath, id) => `${basePath}/${encodeURIComponent(id)}`;

const CRUD_GET_MANY_ACCUMULATE = 'AOR/CRUD_GET_MANY_ACCUMULATE';
const CRUD_GET_MANY = 'AOR/CRUD_GET_MANY';
const GET_MANY = 'GET_MANY';

const crudGetMany = (resource, ids) => ({
    type: CRUD_GET_MANY,
    payload: { ids },
    meta: { resource, fetch: GET_MANY, cancelPrevious: false },
});

const crudGetManyAccumulateAction = (resource, ids) => ({
    type: CRUD_GET_MANY_ACCUMULATE,
    payload: { resource, ids },
    meta: { accumulate: crudGetMany },
});

export class MyReferenceField extends Component {
    componentDidMount() {
        this.fetchReference(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.record.id !== nextProps.record.id) {
            this.fetchReference(nextProps);
        }
    }

    // CUSTOM FUNCTIONS
    fetchReference(props) {
        var source = get(props.record, props.source);

        if (source != null && !Number.isInteger(source)) {
            if (source.id != null) {
                source = source.id
            }
        }

        if (source !== null && typeof source !== 'undefined') {
            this.props.crudGetManyAccumulate(props.reference, [source]);
        }
    }
    // END CUSTOM FUNCTIONS

    render() {
        const {
            record,
            source,
            reference,
            referenceRecord,
            basePath,
            allowEmpty,
            children,
            elStyle,
            linkType,
            muiTheme,
        } = this.props;
        if (React.Children.count(children) !== 1) {
            throw new Error('<MyReferenceField> only accepts a single child');
        }

        // CUSTOM
        if (!referenceRecord && !allowEmpty) {
            if (hideLoadingBar === false) {
                return <LinearProgress />;
            }
            else {
                return '';
            }

        }
        hideLoadingBar = true

        // END CUSTOM

        const rootPath = basePath
            .split('/')
            .slice(0, -1)
            .join('/');

        // CUSTOM 
        var sourceObj = get(record, source);
        var sourceName = source

        if (sourceObj != null && !Number.isInteger(sourceObj)) {
            if (sourceObj.id != null) {
                sourceName += ".id"
            }
        }

        const href = linkToRecord(
            `${rootPath}/${reference}`,
            get(record, sourceName)
        );

        // END CUSTOM
        const linkStyle = { ...getStyles(muiTheme).link, ...elStyle };

        const child = React.cloneElement(children, {
            record: referenceRecord,
            resource: reference,
            allowEmpty,
            basePath,
            translateChoice: false,
        });

        if (linkType === 'edit' || linkType === true) {
            return (
                <Link style={linkStyle} to={href}>
                    {child}
                </Link>
            );
        }
        if (linkType === 'show') {
            return (
                <Link style={linkStyle} to={`${href}/show`}>
                    {child}
                </Link>
            );
        }
        return child;
    }
}

MyReferenceField.propTypes = {
    addLabel: PropTypes.bool,
    allowEmpty: PropTypes.bool.isRequired,
    basePath: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    crudGetManyAccumulate: PropTypes.func.isRequired,
    elStyle: PropTypes.object,
    label: PropTypes.string,
    record: PropTypes.object,
    reference: PropTypes.string.isRequired,
    referenceRecord: PropTypes.object,
    source: PropTypes.string.isRequired,
    linkType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
        .isRequired,
};

MyReferenceField.defaultProps = {
    referenceRecord: null,
    record: {},
    allowEmpty: false,
    linkType: 'edit',
};

const ConnectedMyReferenceField = compose(
    connect(mapStateToProps, {
        crudGetManyAccumulate: crudGetManyAccumulateAction,
    }),
    muiThemeable()
)(MyReferenceField);

ConnectedMyReferenceField.defaultProps = {
    addLabel: true,
};

export default ConnectedMyReferenceField;
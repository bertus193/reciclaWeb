import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardText } from 'material-ui/Card';
import compose from 'recompose/compose';
import inflection from 'inflection';
import { reset } from 'redux-form';
import ViewTitle from 'admin-on-rest/src/mui/layout/ViewTitle';
import Title from 'admin-on-rest/src/mui/layout/Title';
import DefaultActions from './EditActions';
import {
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    DELETE,
    GET_MANY,
    GET_MANY_REFERENCE,
} from 'admin-on-rest/src/rest/types';

const CRUD_GET_ONE = 'AOR/CRUD_GET_ONE';
const crudGetOneAction = (resource, id, basePath, cancelPrevious = true) => ({
    type: CRUD_GET_ONE,
    payload: { id, basePath },
    meta: { resource, fetch: GET_ONE, cancelPrevious },
});

export const CRUD_UPDATE = 'AOR/CRUD_UPDATE';
export const crudUpdateAction = (
    resource,
    id,
    data,
    previousData,
    basePath,
    redirectTo = 'show'
) => ({
    type: CRUD_UPDATE,
    payload: { id, data, previousData, basePath, redirectTo },
    meta: { resource, fetch: UPDATE, cancelPrevious: false },
});

export class MyEdit extends Component {
    componentDidMount() {
        this.updateData();
    }

    componentWillReceiveProps(nextProps) {
        if (
            this.props.id !== nextProps.id ||
            nextProps.version !== this.props.version
        ) {
            this.props.resetForm('record-form');
            this.updateData(nextProps.resource, nextProps.id);
        }
    }

    getBasePath() {
        const { location } = this.props;
        return location.pathname
            .split('/')
            .slice(0, -1)
            .join('/');
    }

    defaultRedirectRoute() {
        return 'list';
    }

    updateData(resource = this.props.resource, id = this.props.id) {
        this.props.crudGetOne(resource, id, this.getBasePath());
    }

    save = (record, redirect) => {
        this.props.crudUpdate(
            this.props.resource,
            this.props.id,
            record,
            this.props.data,
            this.getBasePath(),
            redirect
        );
    };

    render() {
        const {
            actions = <DefaultActions />,
            children,
            data,
            hasDelete,
            hasShow,
            hasList,
            id,
            isLoading,
            resource,
            title,
            translate,
            version,
        } = this.props;

        if (!children) return null;

        const basePath = this.getBasePath();

        const resourceName = translate(`resources.${resource}.name`, {
            smart_count: 1,
            _: inflection.humanize(inflection.singularize(resource)),
        });
        const defaultTitle = translate('aor.page.edit', {
            name: `${resourceName}`,
            id,
            data,
        });
        const titleElement = data ? (
            <Title title={title} record={data} defaultTitle={defaultTitle} />
        ) : (
                ''
            );

        return (
            <div className="edit-page">
                <Card style={{ opacity: isLoading ? 0.8 : 1 }}>
                    {actions &&
                        React.cloneElement(actions, {
                            basePath,
                            data,
                            hasDelete,
                            hasShow,
                            hasList,
                            resource,
                        })}
                    <ViewTitle title={titleElement} />
                    {data ? (
                        React.cloneElement(children, {
                            save: this.save,
                            resource,
                            basePath,
                            record: data,
                            translate,
                            version,
                            redirect:
                                typeof children.props.redirect === 'undefined'
                                    ? this.defaultRedirectRoute()
                                    : children.props.redirect,
                        })
                    ) : (
                            <CardText>&nbsp;</CardText>
                        )}
                </Card>
            </div>
        );
    }
}

MyEdit.propTypes = {
    actions: PropTypes.element,
    children: PropTypes.node,
    crudGetOne: PropTypes.func.isRequired,
    crudUpdate: PropTypes.func.isRequired,
    data: PropTypes.object,
    hasDelete: PropTypes.bool,
    hasShow: PropTypes.bool,
    hasList: PropTypes.bool,
    id: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    resource: PropTypes.string.isRequired,
    title: PropTypes.any,
    translate: PropTypes.func,
    version: PropTypes.number.isRequired,
};

function mapStateToProps(state, props) {
    return {
        id: decodeURIComponent(props.match.params.id),
        data: state.admin.resources[props.resource]
            ? state.admin.resources[props.resource].data[
            decodeURIComponent(props.match.params.id)
            ]
            : null,
        isLoading: state.admin.loading > 0,
        version: state.admin.ui.viewVersion,
    };
}

const enhance = compose(
    connect(mapStateToProps, {
        crudGetOne: crudGetOneAction,
        crudUpdate: crudUpdateAction,
        resetForm: reset,
    })
);

export default enhance(MyEdit);

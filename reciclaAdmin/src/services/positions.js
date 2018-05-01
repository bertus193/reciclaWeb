import React from 'react';
import { Responsive, SimpleList, List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, SimpleForm, TextInput } from 'admin-on-rest';
import UrlField from '../urlField';

export const PositionList = (props) => (
    <List {...props}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => `${record.latitude} / ${record.longitude}`}
                    tertiaryText={record => record.id}
                />
            }
            medium={
                <Datagrid bodyOptions={{ stripedRows: true, showRowHover: true }}>
                    <UrlField urlDirection="positions" source="id" />
                    <TextField source="latitude" />
                    <TextField source="longitude" />
                    <EditButton />
                </Datagrid>
            }
        />

    </List>
);

const PositionTitle = ({ record }) => {
    return <span>Position {record ? `"${record.id}"` : ''}</span>;
};


export const PositionEdit = (props) => (
    <Edit title={<PositionTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="latitude" />
            <TextInput source="longitude" />
        </SimpleForm>
    </Edit>
);

export const PositionCreate = (props) => (
    <Create {...props}>
        <SimpleForm>

            <TextInput source="latitude" />
            <TextInput source="longitude" />
        </SimpleForm>
    </Create>
);
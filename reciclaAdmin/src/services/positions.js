import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, LongTextInput, SimpleForm, TextInput } from 'admin-on-rest';

export const PositionList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="latitude" />
            <TextField source="longitude" />
            <EditButton />
        </Datagrid>
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
            <LongTextInput source="longitude" />
        </SimpleForm>
    </Edit>
);

export const PositionCreate = (props) => (
    <Create {...props}>
        <SimpleForm>

            <TextInput source="latitude" />
            <LongTextInput source="longitude" />
        </SimpleForm>
    </Create>
);
import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, LongTextInput, SimpleForm, TextInput } from 'admin-on-rest';

export const AppLogList = (props) => (
    <List {...props}>
        <Datagrid bodyOptions={{ stripedRows: true, showRowHover: true }}>
            <TextField source="id" />
            <TextField source="timestamp" />
            <TextField source="statusName" />
            <TextField source="exception" />
            <TextField source="path" />
            <EditButton />
        </Datagrid>
    </List>
);

const AppLogTitle = ({ record }) => {
    return <span>AppLog {record ? `"${record.id}"` : ''}</span>;
};


export const AppLogEdit = (props) => (
    <Edit title={<AppLogTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="timestamp" />
            <TextInput source="status" />
            <TextInput source="statusName" />
            <TextInput source="exception" />
            <TextInput source="message" />
            <TextInput source="path" />
        </SimpleForm>
    </Edit>
);

export const AppLogCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="timestamp" />
            <TextInput source="status" />
            <TextInput source="statusName" />
            <TextInput source="exception" />
            <TextInput source="message" />
            <TextInput source="path" />
        </SimpleForm>
    </Create>
);
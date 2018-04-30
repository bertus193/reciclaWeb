import React from 'react';
import { Responsive, SimpleList, List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, SimpleForm, TextInput, DateField } from 'admin-on-rest';
import DateTimeInput from 'aor-datetime-input';

export const AppLogList = (props) => (
    <List {...props}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.path}
                    secondaryText={record => record.exception}
                    tertiaryText={record => new Date(record.timestamp).toLocaleDateString()}
                />
            }
            medium={
                <Datagrid bodyOptions={{ stripedRows: true, showRowHover: true }}>
                    <TextField source="id" />
                    <DateField source="timestamp" showTime locales="es-ES" />
                    <TextField source="statusName" />
                    <TextField source="exception" />
                    <TextField source="path" />
                    <EditButton />
                </Datagrid>
            }
        />
    </List>
);

const AppLogTitle = ({ record }) => {
    return <span>AppLog {record ? `"${record.id}"` : ''}</span>;
};


export const AppLogEdit = (props) => (
    <Edit title={<AppLogTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <DateTimeInput source="timestamp" />
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
            <DateTimeInput source="timestamp" />
            <TextInput source="status" />
            <TextInput source="statusName" />
            <TextInput source="exception" />
            <TextInput source="message" />
            <TextInput source="path" />
        </SimpleForm>
    </Create>
);
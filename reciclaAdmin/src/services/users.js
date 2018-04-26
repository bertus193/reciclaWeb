import React from 'react';
import { Filter, List, Edit, Create, Datagrid, ReferenceField, TextField, EditButton, DisabledInput, LongTextInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput, ChipField, NumberInput } from 'admin-on-rest';
import UrlField from '../urlField';
import DateTimeInput from 'aor-datetime-input';

const UserTitle = ({ record }) => {
    return <span>Title {record ? `"${record.title}"` : ''}</span>;
};

export const UserList = (props) => (
    <List title="All users" {...props}>
        <Datagrid bodyOptions={{ stripedRows: true, showRowHover: true }}>
            <UrlField sortable={false} style={{ textAlign: 'center' }} urlDirection="users" source="id" />
            <TextField sortable={false} source="email" />
            <TextField sortable={false} source="fullName" />
            <TextField sortable={false} source="profilePicture" />
            <TextField sortable={false} source="createdDate" />
            <TextField sortable={false} source="username" />
            <ChipField sortable={false} source="type" />
            <TextField sortable={false} source="points" />
            <TextField sortable={false} source="gamePoints" />
            <TextField sortable={false} source="lastGameDate" />
            <EditButton />
        </Datagrid>
    </List>
);

export const UserEdit = (props) => (
    <Edit title={<UserTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <LongTextInput source="email" />
            <LongTextInput source="fullName" />
            <LongTextInput source="profilePicture" />
            <DateTimeInput source="createdDate" />
            <LongTextInput source="username" />
            <LongTextInput source="type" />
            <NumberInput source="points" />
            <NumberInput source="gamePoints" />
            <DateTimeInput source="lastGameDate" />
        </SimpleForm>
    </Edit>
);
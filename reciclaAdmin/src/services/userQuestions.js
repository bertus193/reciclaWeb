import React from 'react';
import { DateField, ReferenceInput, required, SelectInput, Responsive, SimpleList, List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, SimpleForm, TextInput } from 'admin-on-rest';
import MyReferenceField from '../MyReferenceField'
import DateTimeInput from 'aor-datetime-input';

export const UserQuestionList = (props) => (
    <List {...props} title="User Question List">
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.user}
                    tertiaryText={record => record.id}
                />
            }
            medium={
                <Datagrid bodyOptions={{ stripedRows: true, showRowHover: true }}>
                    <TextField source="id" />
                    <MyReferenceField label="User" source="user" reference="users">
                        <TextField source="username" />
                    </MyReferenceField>
                    <MyReferenceField label="Question" source="question" reference="questions">
                        <TextField source="name" />
                    </MyReferenceField>
                    <MyReferenceField label="User Reply" source="userReply" reference="replies">
                        <TextField source="name" />
                    </MyReferenceField>
                    <DateField source="createdDate" showTime locales="es-ES" />
                    <EditButton />
                </Datagrid>
            }
        />
    </List>
);

const UserQuestionTitle = ({ record }) => {
    return <span>User Question {record ? `"${record.id}"` : ''}</span>;
};


export const UserQuestionEdit = (props) => (
    <Edit title={<UserQuestionTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <ReferenceInput label="User" source="user" reference="users">
                <TextField source="username" />
            </ReferenceInput>
            <ReferenceInput label="Question" source="question" reference="questions">
                <TextField source="name" />
            </ReferenceInput>
            <ReferenceInput label="User Reply" source="userReply" reference="replies">
                <TextField source="name" />
            </ReferenceInput>
            <DateTimeInput source="createdDate" />
        </SimpleForm>
    </Edit>
);

export const UserQuestionCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput label="User" source="user" reference="users">
                <TextField source="username" />
            </ReferenceInput>
            <ReferenceInput label="Question" source="question" reference="questions">
                <TextField source="name" />
            </ReferenceInput>
            <ReferenceInput label="User Reply" source="userReply" reference="replies">
                <TextField source="name" />
            </ReferenceInput>
            <DateTimeInput source="createdDate" />
        </SimpleForm>
    </Create>
);
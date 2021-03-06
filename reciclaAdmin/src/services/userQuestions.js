import React from 'react';
import { DateField, ReferenceInput, SelectInput, Responsive, SimpleList, List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, SimpleForm } from 'admin-on-rest';
import MyReferenceField from '../fieldsAndInputs/MyReferenceField'
import DateTimeInput from 'aor-datetime-input';
import UrlField from '../fieldsAndInputs/MyUrlField';
import MyTextField from '../fieldsAndInputs/MyTextField'

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
                    <UrlField urlDirection="userQuestions" source="id" />
                    <MyReferenceField label="User" source="user" reference="users">
                        <MyTextField source="email" source2="username" />
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

const optionRenderer = choice => `${choice.email} ${choice.username}`;

export const UserQuestionEdit = (props) => (
    <Edit title={<UserQuestionTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <ReferenceInput label="User" source="user" reference="users">
                <SelectInput optionText={optionRenderer} />
            </ReferenceInput>
            <ReferenceInput label="Question" source="question" reference="questions">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput label="User Reply" source="userReply.id" reference="replies">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <DateTimeInput source="createdDate" />
        </SimpleForm>
    </Edit>
);

export const UserQuestionCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput label="User" source="user" reference="users">
                <SelectInput optionText={optionRenderer} />
            </ReferenceInput>
            <ReferenceInput label="Question" source="question" reference="questions">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput label="User Reply" source="userReply" reference="replies">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <DateTimeInput source="createdDate" />
        </SimpleForm>
    </Create>
);
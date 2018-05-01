import React from 'react';
import { ReferenceInput, required, SelectInput, Responsive, SimpleList, List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, SimpleForm, TextInput } from 'admin-on-rest';
import MyReferenceField from '../MyReferenceField'

export const ReplyList = (props) => (
    <List {...props}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.name}
                    tertiaryText={record => record.id}
                />
            }
            medium={
                <Datagrid bodyOptions={{ stripedRows: true, showRowHover: true }}>
                    <TextField source="id" />
                    <TextField source="name" />
                    <MyReferenceField label="Question" source="question" reference="questions">
                        <TextField source="name" />
                    </MyReferenceField>
                    <EditButton />
                </Datagrid>
            }
        />
    </List>
);

const ReplyTitle = ({ record }) => {
    return <span>Reply {record ? `"${record.id}"` : ''}</span>;
};


export const ReplyEdit = (props) => (
    <Edit title={<ReplyTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <ReferenceInput label="Question" source="question" reference="questions" validate={required}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const ReplyCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <ReferenceInput label="Question" source="question" reference="questions" validate={required}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
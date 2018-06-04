import React from 'react';
import { ReferenceInput, required, SelectInput, NumberInput, Responsive, SimpleList, List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, SimpleForm, TextInput } from 'admin-on-rest';
import MyReferenceField from '../fieldsAndInputs/MyReferenceField'
import UrlField from '../fieldsAndInputs/MyUrlField';


export const QuestionList = (props) => (
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
                    <UrlField urlDirection="questions" source="id" />
                    <TextField source="name" />
                    <TextField label="Question value" source="questionValue" />
                    <MyReferenceField label="Correct reply" source="correctReply" reference="replies">
                        <TextField source="name" />
                    </MyReferenceField>
                    <EditButton />
                </Datagrid>
            }
        />
    </List>
);

const QuestionTitle = ({ record }) => {
    return <span>Question {record ? `"${record.id}"` : ''}</span>;
};


export const QuestionEdit = (props) => (
    <Edit title={<QuestionTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <NumberInput abel="Question value" source="questionValue" />
            <ReferenceInput label="Correct reply" source="correctReply.id" reference="replies" validate={required}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const QuestionCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <NumberInput abel="Question value" source="questionValue" />
            <ReferenceInput label="Correct reply" source="correctReply.id" reference="replies">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
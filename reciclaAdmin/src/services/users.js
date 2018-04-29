import React from 'react';
import { required, ReferenceInput, SelectInput, List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, LongTextInput, SimpleForm, TextInput, ChipField, NumberInput, DateField, RadioButtonGroupInput } from 'admin-on-rest';
import UrlField from '../urlField';
import DateTimeInput from 'aor-datetime-input';
import MyReferenceField from '../MyReferenceField'

const UserEditTitle = ({ record }) => {
    return <span>Editar usuario: {record ? `${record.id}` : ''}</span>;
};

const choices = [
    { id: 'Normal', name: 'Normal' },
    { id: 'Facebook', name: 'Facebook' },
    { id: 'Instagram', name: 'Instagram' },
];

export const UserList = (props) => (
    <List title="All users" {...props}>
        <Datagrid bodyOptions={{ stripedRows: true, showRowHover: true }}>
            <UrlField style={{ textAlign: 'center' }} urlDirection="users" source="id" />
            <TextField source="username" />
            <TextField source="fullName" />
            <DateField source="createdDate" showTime locales="es-ES" />
            <MyReferenceField label="Position" source="lastPosition" reference="positions">
                <TextField source="id" />
            </MyReferenceField>
            <ChipField source="type" />
            <TextField source="points" />
            <TextField source="gamePoints" />
            <DateField source="lastGameDate" showTime locales="es-ES" />
            <EditButton />
        </Datagrid>
    </List>
);

export const UserEdit = (props) => (
    <Edit title={<UserEditTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <LongTextInput source="email" />
            <TextInput placeholder="" source="password" type="password" />
            <LongTextInput source="fullName" />
            <LongTextInput source="profilePicture" />
            <DateTimeInput source="createdDate" />
            <ReferenceInput label="Position" source="lastPosition.id" reference="positions" validate={required}>
                <SelectInput optionText="id" />
            </ReferenceInput>
            <LongTextInput source="username" />
            <RadioButtonGroupInput source="type" choices={choices} translateChoice={false} />
            <NumberInput source="points" />
            <NumberInput source="gamePoints" />
            <DateTimeInput source="lastGameDate" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = (props) => (
    <Create title={"Añadir usuario"} {...props}>
        <SimpleForm>
            <LongTextInput source="email" />
            <TextInput source="password" type="password" />
            <LongTextInput source="fullName" />
            <LongTextInput source="profilePicture" />
            <DateTimeInput source="createdDate" />
            <ReferenceInput label="Position" source="lastPosition.id" reference="positions" validate={required} allowEmpty>
                <SelectInput optionText="id" />
            </ReferenceInput>
            <LongTextInput source="username" />
            <RadioButtonGroupInput source="type" choices={choices} translateChoice={false} />
            <NumberInput source="points" />
            <NumberInput source="gamePoints" />
            <DateTimeInput source="lastGameDate" />
        </SimpleForm>
    </Create>
);
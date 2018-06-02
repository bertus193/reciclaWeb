import React from 'react';
import { BooleanInput, ImageField, Responsive, SimpleList, ReferenceInput, SelectInput, List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, SimpleForm, TextInput, ChipField, NumberInput, DateField, RadioButtonGroupInput } from 'admin-on-rest';
import UrlField from '../fieldsAndInputs/MyUrlField';
import DateTimeInput from 'aor-datetime-input';
import MyReferenceField from '../fieldsAndInputs/MyReferenceField'
import TextImageField from '../fieldsAndInputs/textImageField'

const UserEditTitle = ({ record }) => {
    return <span>Editar usuario: {record ? `${record.id}` : ''}</span>;
};

const choices = [
    { id: 'Normal', name: 'Normal' },
    { id: 'Facebook', name: 'Facebook' },
    { id: 'Instagram', name: 'Instagram' },
    { id: 'Admin', name: 'Admin' }
];

export const UserList = (props) => (
    <List title="All users" {...props}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.username}
                    secondaryText={record => `Points: ${record.points} - GamePoints: ${record.gamePoints}`}
                    tertiaryText={record => record.type}
                />
            }
            medium={
                <Datagrid bodyOptions={{ stripedRows: true, showRowHover: true }}>
                    <UrlField style={{ textAlign: 'center' }} urlDirection="users" source="id" />
                    <TextImageField source="email" source2="profilePicture" source3="username" />
                    <TextField label="Full name" source="fullName" />
                    <MyReferenceField label="Position" source="lastPosition" reference="positions">
                        <TextField source="id" />
                    </MyReferenceField>
                    <ChipField source="type" />
                    <TextField source="points" />
                    <TextField label="Game points" source="gamePoints" />
                    <DateField label="Last game date" source="lastGameDate" showTime locales="es-ES" />
                    <EditButton />
                </Datagrid>
            }
        />
    </List>
);

export const UserEdit = (props) => (
    <Edit title={<UserEditTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <ImageField source="profilePicture" />
            <TextInput source="email" />
            <TextInput placeholder="" source="password" type="password" />
            <TextInput label="Full name" source="fullName" />
            <TextInput label="URL profile picture" source="profilePicture" />
            <DateTimeInput label="Created date" source="createdDate" />
            <ReferenceInput label="Position" source="lastPosition.id" reference="positions" allowEmpty>
                <SelectInput optionText="id" />
            </ReferenceInput>
            <RadioButtonGroupInput source="type" choices={choices} translateChoice={false} />
            <NumberInput source="points" />
            <NumberInput label="Game points" source="gamePoints" />
            <DateTimeInput label="Last game date" source="lastGameDate" />
            <BooleanInput label="Usuario activo" source="enabled" />
            <ReferenceInput label="Colectivo" source="collective.id" reference="collectives">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <DateTimeInput label="Birthdate" source="birthdate" />
            <TextInput source="school" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = (props) => (
    <Create title={"Añadir usuario"} {...props}>
        <SimpleForm>
            <TextInput source="email" />
            <TextInput source="username" />
            <TextInput source="password" type="password" />
            <TextInput label="Full name" source="fullName" />
            <TextInput label="URL profile picture" source="profilePicture" />
            <ReferenceInput label="Position" source="lastPosition.id" reference="positions" allowEmpty>
                <SelectInput optionText="id" />
            </ReferenceInput>
            <RadioButtonGroupInput source="type" choices={choices} translateChoice={false} />
            <NumberInput source="points" />
            <NumberInput label="Game points" source="gamePoints" />
            <ReferenceInput label="Colectivo" source="collective.id" reference="collectives">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
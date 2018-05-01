import React from 'react';
import { Responsive, SimpleList, ReferenceInput, SelectInput, List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, SimpleForm, TextInput, ChipField, NumberInput, DateField, RadioButtonGroupInput } from 'admin-on-rest';
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
                    <TextField source="username" />
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
            <TextInput source="username" />
            <DisabledInput source="id" />
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
        </SimpleForm>
    </Edit>
);

export const UserCreate = (props) => (
    <Create title={"Añadir usuario"} {...props}>
        <SimpleForm>
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
            <DateTimeInput label="Last game date" source="lastGameDate" />
        </SimpleForm>
    </Create>
);
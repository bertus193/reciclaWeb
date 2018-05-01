import React from 'react';
import { SelectInput, ReferenceInput, Responsive, SimpleList, List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, SimpleForm, TextInput } from 'admin-on-rest';
import MyReferenceField from '../MyReferenceField'

export const StoragePointList = (props) => (
    <List {...props} title="Storage Point List">
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
                    <MyReferenceField label="Position" source="position" reference="positions">
                        <TextField source="id" />
                    </MyReferenceField>
                    <EditButton />
                </Datagrid>
            }
        />
    </List>
);

const StoragePointTitle = ({ record }) => {
    return <span>Storage Point {record ? `"${record.id}"` : ''}</span>;
};


export const StoragePointEdit = (props) => (
    <Edit title={<StoragePointTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <ReferenceInput label="Position" source="position.id" reference="positions">
                <SelectInput optionText="id" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const StoragePointCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <ReferenceInput label="Position" source="position.id" reference="positions">
                <SelectInput optionText="id" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
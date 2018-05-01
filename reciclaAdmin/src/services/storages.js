import React from 'react';
import { required, SelectInput, ReferenceInput, Responsive, SimpleList, List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, SimpleForm, TextInput } from 'admin-on-rest';
import MyReferenceField from '../MyReferenceField'

export const StorageList = (props) => (
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
                    <MyReferenceField label="Item type" source="itemType" reference="itemTypes">
                        <TextField source="type" />
                    </MyReferenceField>
                    <MyReferenceField label="Storage point" source="storagePoint" reference="storagePoints">
                        <TextField source="name" />
                    </MyReferenceField>
                    <EditButton />
                </Datagrid>
            }
        />
    </List>
);

const StorageTitle = ({ record }) => {
    return <span>Storage {record ? `"${record.id}"` : ''}</span>;
};


export const StorageEdit = (props) => (
    <Edit title={<StorageTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="description" />
            <ReferenceInput label="Item type" source="itemType" reference="itemTypes" validate={required}>
                <SelectInput optionText="id" />
            </ReferenceInput>
            <ReferenceInput label="Storage point" source="storagePoint" reference="storagePoints" validate={required}>
                <SelectInput optionText="id" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const StorageCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="description" />
            <ReferenceInput label="Item type" source="itemType" reference="itemTypes" validate={required}>
                <SelectInput optionText="id" />
            </ReferenceInput>
            <ReferenceInput label="Storage point" source="storagePoint" reference="storagePoints" validate={required}>
                <SelectInput optionText="id" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
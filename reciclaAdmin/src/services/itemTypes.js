import React from 'react';
import { NumberInput, Responsive, SimpleList, List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, SimpleForm, TextInput } from 'admin-on-rest';
import UrlField from '../fieldsAndInputs/MyUrlField';

export const ItemTypeList = (props) => (
    <List {...props} title="Recycle Item Type List">
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.typeEs}
                    secondaryText={record => record.typeColor}
                    tertiaryText={record => record.id}
                />
            }
            medium={
                <Datagrid bodyOptions={{ stripedRows: true, showRowHover: true }}>
                    <UrlField urlDirection="itemTypes" source="id" />
                    <TextField label="Value" source="recycleValue" />
                    <TextField label="English name" source="type" />
                    <TextField label="Color" source="typeColor" />
                    <TextField label="Spanish name" source="typeEs" />
                    <EditButton />
                </Datagrid>
            }
        />
    </List>
);

const ItemTypeTitle = ({ record }) => {
    return <span>Recycle Item Type {record ? `"${record.id}"` : ''}</span>;
};


export const ItemTypeEdit = (props) => (
    <Edit title={<ItemTypeTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <NumberInput source="recycleValue" />
            <TextInput label="English name" source="type" />
            <TextInput source="typeColor" />
            <TextInput label="Spanish name" source="typeEs" />
        </SimpleForm>
    </Edit>
);

export const ItemTypeCreate = (props) => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <NumberInput source="recycleValue" />
            <TextInput label="English name" source="type" />
            <TextInput source="typeColor" />
            <TextInput label="Spanish name" source="typeEs" />
        </SimpleForm>
    </Create>
);
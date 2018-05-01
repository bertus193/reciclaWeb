import React from 'react';
import { SelectInput, ReferenceInput, Responsive, SimpleList, List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, SimpleForm, TextInput } from 'admin-on-rest';
import MyReferenceField from '../MyReferenceField'

export const ItemTypeNameList = (props) => (
    <List {...props} title="Item Type Name List">
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.description}
                    tertiaryText={record => record.id}
                />
            }
            medium={
                <Datagrid bodyOptions={{ stripedRows: true, showRowHover: true }}>
                    <TextField source="id" />
                    <TextField source="description" />
                    <MyReferenceField label="Item type" source="itemType" reference="itemTypes">
                        <TextField source="type" />
                    </MyReferenceField>
                    <EditButton />
                </Datagrid>
            }
        />
    </List>
);

const ItemTypeNameTitle = ({ record }) => {
    return <span>Item Type Name {record ? `"${record.id}"` : ''}</span>;
};


export const ItemTypeNameEdit = (props) => (
    <Edit title={<ItemTypeNameTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="description" />
            <ReferenceInput label="Item type" source="itemType.id" reference="itemTypes">
                <SelectInput optionText="type" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const ItemTypeNameCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="description" />
            <ReferenceInput label="Item type" source="itemType.id" reference="itemTypes">
                <SelectInput optionText="type" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
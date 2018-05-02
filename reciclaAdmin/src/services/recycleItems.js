import React from 'react';
import { ImageInput, ImageField, DateField, ReferenceInput, SelectInput, Responsive, SimpleList, List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, SimpleForm, TextInput } from 'admin-on-rest';
import MyReferenceField from '../fieldsAndInputs/MyReferenceField'
import DateTimeInput from 'aor-datetime-input';
import UrlField from '../fieldsAndInputs/MyUrlField';
import TextImageField from '../fieldsAndInputs/textImageField'

export const RecycleItemList = (props) => (
    <List {...props} title="Recycle Item List">
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.name}
                    secondaryText={record => new Date(record.createdDate).toLocaleDateString()}
                    tertiaryText={record => record.id}
                />
            }
            medium={
                <Datagrid bodyOptions={{ stripedRows: true, showRowHover: true }}>
                    <UrlField urlDirection="recycleItems" source="id" />
                    <TextImageField source="name" source2="image" />
                    <MyReferenceField label="Recycled by" source="recycleUser" reference="users">
                        <TextField source="username" />
                    </MyReferenceField>
                    <MyReferenceField label="Item type" source="itemType" reference="itemTypes">
                        <TextField source="type" />
                    </MyReferenceField>
                    <MyReferenceField label="Storage" source="storage" reference="storages">
                        <TextField source="name" />
                    </MyReferenceField>
                    <DateField label="Created date" source="createdDate" showTime locales="es-ES" />
                    <EditButton />
                </Datagrid>
            }
        />
    </List>
);

const RecycleItemTitle = ({ record }) => {
    return <span>Recycle Item {record ? `"${record.id}"` : ''}</span>;
};


export const RecycleItemEdit = (props) => (
    <Edit title={<RecycleItemTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <ImageField source="image" />
            <TextInput source="name" />
            <ReferenceInput label="Recycle user" source="recycleUser" reference="users">
                <SelectInput optionText="username" />
            </ReferenceInput>
            <ReferenceInput label="Item type" source="itemType.id" reference="itemTypes">
                <SelectInput optionText="type" />
            </ReferenceInput>
            <ReferenceInput label="Storage" source="storage" reference="storages">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <DateTimeInput label="Created date" source="createdDate" />
        </SimpleForm>
    </Edit>
);

export const RecycleItemCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput label="URL image" source="image" />
            <ReferenceInput label="Recycled by" source="recycleUser" reference="users">
                <SelectInput optionText="username" />
            </ReferenceInput>
            <ReferenceInput label="Item type" source="itemType.id" reference="itemTypes">
                <SelectInput optionText="type" />
            </ReferenceInput>
            <ReferenceInput label="Storage" source="storage" reference="storages">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <DateTimeInput label="Created date" source="createdDate" />
        </SimpleForm>
    </Create>
);
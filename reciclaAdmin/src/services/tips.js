import React from 'react';
import { LongTextInput, Responsive, SimpleList, List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, SimpleForm, TextInput } from 'admin-on-rest';
import UrlField from '../fieldsAndInputs/MyUrlField';


export const TipList = (props) => (
    <List {...props}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.name}
                    secondaryText={record => record.description}
                    tertiaryText={record => record.id}
                />
            }
            medium={
                <Datagrid bodyOptions={{ stripedRows: true, showRowHover: true }}>
                    <UrlField urlDirection="tips" source="id" />
                    <TextField source="name" />
                    <TextField source="description" />
                    <EditButton />
                </Datagrid>
            }
        />
    </List>
);

const TipTitle = ({ record }) => {
    return <span>Tip {record ? `"${record.id}"` : ''}</span>;
};


export const TipEdit = (props) => (
    <Edit title={<TipTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <LongTextInput source="description" />
        </SimpleForm>
    </Edit>
);

export const TipCreate = (props) => (
    <Create title={"Añadir Tip"} {...props}>
        <SimpleForm redirect="list">
            <TextInput source="name" />
            <LongTextInput source="description" />
        </SimpleForm>
    </Create>
);
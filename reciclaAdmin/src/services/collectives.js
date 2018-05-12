import React from 'react';
import { Responsive, SimpleList, List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, SimpleForm, TextInput } from 'admin-on-rest';
import UrlField from '../fieldsAndInputs/MyUrlField';

export const CollectiveList = (props) => (
    <List {...props}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.name}
                    secondaryText={record => record.abbreviation}
                    tertiaryText={record => record.id}
                />
            }
            medium={
                <Datagrid bodyOptions={{ stripedRows: true, showRowHover: true }}>
                    <UrlField urlDirection="collectives" source="id" />
                    <TextField source="name" />
                    <TextField source="abbreviation" />
                    <EditButton />
                </Datagrid>
            }
        />

    </List>
);

const CollectiveTitle = ({ record }) => {
    return <span>Collective {record ? `"${record.id}"` : ''}</span>;
};


export const CollectiveEdit = (props) => (
    <Edit title={<CollectiveTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <TextInput source="abbreviation" />
        </SimpleForm>
    </Edit>
);

export const CollectiveCreate = (props) => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <TextInput source="name" />
            <TextInput source="abbreviation" />
        </SimpleForm>
    </Create>
);
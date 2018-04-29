// in src/App.js
import React from 'react';
import { fetchUtils, jsonServerRestClient, Admin, Resource, Delete } from 'admin-on-rest';

import { PositionList, PositionEdit, PositionCreate } from './services/positions';
import { UserList, UserEdit, UserCreate } from './services/users'

import authClient from './authClient';
import myTheme from './myTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './App.css';

const App = () => (
    <Admin theme={getMuiTheme(myTheme)} authClient={authClient} restClient={jsonServerRestClient('http://127.0.0.1:8080/admin')}>
        <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} remove={Delete} />
        <Resource name="positions" list={PositionList} edit={PositionEdit} />
    </Admin>
);
/*<Resource name="posts" list={PositionList} edit={PositionEdit} create={PositionCreate} remove={Delete} />*/
export default App;
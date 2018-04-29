// in src/App.js
import React from 'react';
import { jsonServerRestClient, Admin, Resource, Delete } from 'admin-on-rest';

import { PositionList, PositionEdit, PositionCreate } from './services/positions';
import { AppLogList, AppLogEdit, AppLogCreate } from './services/appLog';
import { UserList, UserEdit, UserCreate } from './services/users'

import authClient from './authClient';
import myTheme from './myTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './App.css';

import AppLogIcon from 'material-ui/svg-icons/action/book';
import UserIcon from 'material-ui/svg-icons/action/account-circle';
import PositionIcon from 'material-ui/svg-icons/communication/location-on';

const App = () => (
    <Admin title="Panel de administración" theme={getMuiTheme(myTheme)} authClient={authClient} restClient={jsonServerRestClient('https://reciclaweb-server.herokuapp.com/admin')}>
        <Resource name="users" icon={UserIcon} list={UserList} edit={UserEdit} create={UserCreate} remove={Delete} />
        <Resource name="positions" icon={PositionIcon} list={PositionList} edit={PositionEdit} create={PositionCreate} remove={Delete} />
        <Resource name="appLogs" icon={AppLogIcon} list={AppLogList} edit={AppLogEdit} create={AppLogCreate} remove={Delete} />
    </Admin>
);
/*<Resource name="posts" list={PositionList} edit={PositionEdit} create={PositionCreate} remove={Delete} />*/
export default App;
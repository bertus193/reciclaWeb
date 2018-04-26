// in src/App.js
import React from 'react';
import { simpleRestClient, fetchUtils, jsonServerRestClient, Admin, Resource, Delete } from 'admin-on-rest';

import { PostList, PostEdit, PostCreate } from './services/posts';
import { UserList, UserEdit } from './services/users'

import authClient from './authClient';
import myTheme from './myTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './App.css';

const App = () => (
    <Admin theme={getMuiTheme(myTheme)} authClient={authClient} restClient={jsonServerRestClient('http://127.0.0.1:8080/admin')}>
        <Resource name="users" list={UserList} edit={UserEdit} />
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} remove={Delete} />
    </Admin>
);
/*<Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} remove={Delete} />*/
export default App;
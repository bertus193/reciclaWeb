// in src/App.js
import React from 'react';
import { fetchUtils, jsonServerRestClient, Admin, Resource, Delete } from 'admin-on-rest';

import { PositionList, PositionEdit, PositionCreate } from './services/positions';
import { AppLogList, AppLogEdit, AppLogCreate } from './services/appLogs';
import { UserList, UserEdit, UserCreate } from './services/users'
import { ItemTypeList, ItemTypeEdit, ItemTypeCreate } from './services/itemTypes'
import { QuestionList, QuestionEdit, QuestionCreate } from './services/questions'
import { RecycleItemList, RecycleItemEdit, RecycleItemCreate } from './services/recycleItems'
import { ReplyList, ReplyEdit, ReplyCreate } from './services/replies'
import { StoragePointList, StoragePointEdit, StoragePointCreate } from './services/storagePoints'
import { StorageList, StorageEdit, StorageCreate } from './services/storages'
import { UserQuestionList, UserQuestionEdit, UserQuestionCreate } from './services/userQuestions'
import { ItemTypeNameList, ItemTypeNameEdit, ItemTypeNameCreate } from './services/itemTypeNames'
import { CollectiveList, CollectiveEdit, CollectiveCreate } from './services/collectives'
import { TipList, TipEdit, TipCreate } from './services/tips'

import authClient from './config/authClient';
import myTheme from './config/myTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppConfig from './config/config'

import './style/App.css';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers.set('x-auth-token', localStorage.getItem('token'));
    options.headers.set('x-admin-token', 'c772e65a-4afe-4d70-a61b-eeaabe93cc53')
    return fetchUtils.fetchJson(url, options);
}
const restClient = jsonServerRestClient(AppConfig.apiEndPoint + AppConfig.apiEndPointSubPath, httpClient);

const App = () => (
    <Admin title="Panel de administración" theme={getMuiTheme(myTheme)} authClient={authClient} restClient={restClient}>
        <Resource name="recycleItems" options={{ label: 'Recycle items' }} list={RecycleItemList} edit={RecycleItemEdit} create={RecycleItemCreate} remove={Delete} />
        <Resource name="appLogs" options={{ label: 'Logs' }} list={AppLogList} edit={AppLogEdit} create={AppLogCreate} remove={Delete} />
        <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} remove={Delete} />
        <Resource name="collectives" list={CollectiveList} edit={CollectiveEdit} create={CollectiveCreate} remove={Delete} />
        <Resource name="storagePoints" options={{ label: 'Storage points' }} list={StoragePointList} edit={StoragePointEdit} create={StoragePointCreate} remove={Delete} />
        <Resource name="storages" list={StorageList} edit={StorageEdit} create={StorageCreate} remove={Delete} />
        <Resource name="itemTypeNames" options={{ label: 'Item type names' }} list={ItemTypeNameList} edit={ItemTypeNameEdit} create={ItemTypeNameCreate} remove={Delete} />
        <Resource name="itemTypes" options={{ label: 'Recycle item types' }} list={ItemTypeList} edit={ItemTypeEdit} create={ItemTypeCreate} remove={Delete} />
        <Resource name="positions" list={PositionList} edit={PositionEdit} create={PositionCreate} remove={Delete} />
        <Resource name="questions" list={QuestionList} edit={QuestionEdit} create={QuestionCreate} remove={Delete} />
        <Resource name="replies" list={ReplyList} edit={ReplyEdit} create={ReplyCreate} remove={Delete} />
        <Resource name="userQuestions" options={{ label: 'User questions' }} list={UserQuestionList} edit={UserQuestionEdit} create={UserQuestionCreate} remove={Delete} />
        <Resource name="tips" options={{ label: 'Tips' }} list={TipList} edit={TipEdit} create={TipCreate} remove={Delete} />
    </Admin>
);
/*<Resource name="posts" list={PositionList} edit={PositionEdit} create={PositionCreate} remove={Delete} />*/
export default App;
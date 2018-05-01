// in src/App.js
import React from 'react';
import { jsonServerRestClient, Admin, Resource, Delete } from 'admin-on-rest';

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

import authClient from './authClient';
import myTheme from './myTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './App.css';

import AppLogIcon from 'material-ui/svg-icons/action/book';
import UserIcon from 'material-ui/svg-icons/action/account-circle';
import PositionIcon from 'material-ui/svg-icons/communication/location-on';

const App = () => (
    <Admin title="Panel de administración" theme={getMuiTheme(myTheme)} authClient={authClient} restClient={jsonServerRestClient('https://reciclaweb-server.herokuapp.com/admin/')}>
        <Resource name="users" icon={UserIcon} list={UserList} edit={UserEdit} create={UserCreate} remove={Delete} />
        <Resource name="positions" icon={PositionIcon} list={PositionList} edit={PositionEdit} create={PositionCreate} remove={Delete} />
        <Resource name="appLogs" options={{ label: 'Logs' }} icon={AppLogIcon} list={AppLogList} edit={AppLogEdit} create={AppLogCreate} remove={Delete} />
        <Resource name="itemTypes" options={{ label: 'Recycle item types' }} icon={AppLogIcon} list={ItemTypeList} edit={ItemTypeEdit} create={ItemTypeCreate} remove={Delete} />
        <Resource name="questions" icon={AppLogIcon} list={QuestionList} edit={QuestionEdit} create={QuestionCreate} remove={Delete} />
        <Resource name="recycleItems" options={{ label: 'Recycle items' }} icon={AppLogIcon} list={RecycleItemList} edit={RecycleItemEdit} create={RecycleItemCreate} remove={Delete} />
        <Resource name="replies" icon={AppLogIcon} list={ReplyList} edit={ReplyEdit} create={ReplyCreate} remove={Delete} />
        <Resource name="storagePoints" options={{ label: 'Storage points' }} icon={AppLogIcon} list={StoragePointList} edit={StoragePointEdit} create={StoragePointCreate} remove={Delete} />
        <Resource name="storages" icon={AppLogIcon} list={StorageList} edit={StorageEdit} create={StorageCreate} remove={Delete} />
        <Resource name="userQuestions" options={{ label: 'User questions' }} icon={AppLogIcon} list={UserQuestionList} edit={UserQuestionEdit} create={UserQuestionCreate} remove={Delete} />
        <Resource name="itemTypeNames" options={{ label: 'Item type names' }} icon={AppLogIcon} list={ItemTypeNameList} edit={ItemTypeNameEdit} create={ItemTypeNameCreate} remove={Delete} />
    </Admin>
);
/*<Resource name="posts" list={PositionList} edit={PositionEdit} create={PositionCreate} remove={Delete} />*/
export default App;
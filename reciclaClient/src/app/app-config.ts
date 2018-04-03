import { InjectionToken } from '@angular/core';

export interface ApplicationConfig {
    appName: string
    apiEndpoint: string
    uploadFilesUrl: string
    DEBUG_MODE: boolean
    defaultTimeoutTime: number
    defaultTimeoutMsg: string
    defaultImageDirectory: string
    googleCloudVisionAPIKey: string
    itemsPerPage: number //Pagination list limit
    debugUserEmail: string //If DEBUG_MODE == false is not used
    debugUserPassword: string //If DEBUG_MODE == false is not used,
    instagramAPIKey: string
}

// Configuration values for our app
export const APP_CONFIG: ApplicationConfig = {
    appName: 'ReciclaWeb App',
    // https://reciclaweb-server.herokuapp.com || http://127.0.0.1:8080
    apiEndpoint: 'https://reciclaweb-server.herokuapp.com',
    uploadFilesUrl: 'https://reciclaweb.000webhostapp.com',
    DEBUG_MODE: true,
    defaultTimeoutTime: 10000,
    defaultTimeoutMsg: 'Parece que ha habido algún problema, prueba en unos minutos.',
    defaultImageDirectory: 'assets/imgs/icons/recycle.png',
    googleCloudVisionAPIKey: 'AIzaSyCVl9Ien_9KOFEN197dPqklyIJ7ad1z44k',
    itemsPerPage: 10,
    debugUserEmail: 'debug@debug.com',
    debugUserPassword: 'debugPassword',
    instagramAPIKey: '92039beca32246398f5d17847329007a'

};

export const APP_CONFIG_TOKEN = new InjectionToken<ApplicationConfig>('config');
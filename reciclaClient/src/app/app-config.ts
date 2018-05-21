import { InjectionToken } from '@angular/core';

export class ApplicationConfig {
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
    emailFrom: string
    emailFromName: string
    emailFromPassword: string
}

// Configuration values for our app

export let APP_CONFIG: ApplicationConfig = new ApplicationConfig()
// https://reciclaweb-server.herokuapp.com || http://127.0.0.1:8080
APP_CONFIG.appName = 'ReciclaWeb App'
APP_CONFIG.apiEndpoint = 'https://reciclaweb-server.herokuapp.com'
APP_CONFIG.uploadFilesUrl = 'https://reciclaweb.000webhostapp.com'
APP_CONFIG.DEBUG_MODE = true
APP_CONFIG.defaultTimeoutTime = 10000
APP_CONFIG.defaultTimeoutMsg = 'Parece que ha habido algún problema, prueba en unos minutos.'
APP_CONFIG.googleCloudVisionAPIKey = 'GOOGLECLOUD_API_KEY'
APP_CONFIG.itemsPerPage = 10
APP_CONFIG.debugUserEmail = 'debug@debug.com'
APP_CONFIG.debugUserPassword = 'debug'
APP_CONFIG.instagramAPIKey = '7bec1422cf9f4eaf952b4c1f3dbfa4ab'
APP_CONFIG.emailFrom = 'email'
APP_CONFIG.emailFromName = 'ReciclaUA (no contestar)'
APP_CONFIG.emailFromPassword = 'email_password'

export const APP_CONFIG_TOKEN = new InjectionToken<ApplicationConfig>('config');
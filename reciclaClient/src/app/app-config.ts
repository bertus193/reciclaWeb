import { InjectionToken } from '@angular/core';

export interface ApplicationConfig {
    appName: string
    apiEndpoint: string
    DEBUG_MODE: boolean
    defaultTimeoutTime: number
    defaultTimeoutMsg: string
    defaultImageDirectory: string
}

// Configuration values for our app
export const APP_CONFIG: ApplicationConfig = {
    appName: 'ReciclaWeb App',
    apiEndpoint: 'https://reciclaweb-server.herokuapp.com',
    DEBUG_MODE: true,
    defaultTimeoutTime: 5000,
    defaultTimeoutMsg: 'Parece que ha habido algún problema, prueba en unos minutos.',
    defaultImageDirectory: 'assets/imgs/icons/recycle.png'

};

export const APP_CONFIG_TOKEN = new InjectionToken<ApplicationConfig>('config');
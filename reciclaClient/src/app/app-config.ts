import { InjectionToken } from '@angular/core';

export interface ApplicationConfig {
    appName: string;
    apiEndpoint: string;
    DEBUG_MODE: boolean;
}

// Configuration values for our app
export const APP_CONFIG: ApplicationConfig = {
    appName: 'ReciclaWeb App',
    apiEndpoint: 'https://reciclaweb-server.herokuapp.com',
    DEBUG_MODE: true

};

export const APP_CONFIG_TOKEN = new InjectionToken<ApplicationConfig>('config');
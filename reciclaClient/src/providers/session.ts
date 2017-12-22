import { Injectable } from '@angular/core';


import { Storage } from '@ionic/storage';

@Injectable()
export class SessionProvider {

    constructor(public storage: Storage) {

    }

    public getSessionToken(): Promise<string> {
        return this.storage.get('authToken');
    }

    public setSessionToken(token: string) {
        this.storage.set('authToken', token);
    }
}

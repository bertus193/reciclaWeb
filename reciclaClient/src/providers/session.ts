import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { User } from '../models/user'

@Injectable()
export class SessionProvider {
    private user: User

    constructor(
        private storage: Storage) {

    }

    public getSessionToken(): Promise<string> {
        return this.storage.get('authToken');
    }

    public setSessionToken(token: string) {
        this.storage.set('authToken', token);
    }

    public getUser(): any {
        return this.user
    }

    public setUser(user: User) {
        this.user = user
    }

    logout() {
        this.setSessionToken(null)
    }
}

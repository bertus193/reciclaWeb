import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { User } from '../models/user'

@Injectable()
export class SessionProvider {
    private user: User

    constructor(
        private storage: Storage) {
    }

    public updateSession(user: User) {
        this.user = user
        this.storage.set('user', this.user)
    }

    public setUserHelp(userHelp: boolean) {
        this.storage.set('help', userHelp)
    }

    public getUserHelp() {
        return this.storage.get('help')
    }

    public getSession(): Promise<User> {
        return this.storage.get('user')
    }

    public destroySession() {
        this.storage.set('user', null)
    }

    public getUser(): any {
        return this.user
    }
}

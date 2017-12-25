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
        this.storage.set('user', this.user)
        this.user = user
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

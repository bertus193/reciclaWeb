import { Injectable } from '@angular/core';
import jsSHA from 'jssha'

@Injectable()
export class EncryptProvider {

    constructor() { }

    encryptPassword(password: string): string {
        let shaObj = new jsSHA("SHA-256", "TEXT");
        shaObj.update(password)
        let hash = shaObj.getHash("HEX");
        return hash
    }


}
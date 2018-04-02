import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

@Component({
    selector: 'page-normalRegister',
    templateUrl: 'normalRegister.html'
})
export class NormalRegisterPage {

    email: any
    password: any
    password_repeat: any
    registerForm: FormGroup
    userIsRegistered: boolean = false

    @Output() onRegisterFinishEvent: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private formBuilder: FormBuilder
    ) {
        this.registerForm = this.formBuilder.group({
            email: [''],
            password: [''],
            password_repeat: [''],
        }, {
                validator: NormalRegisterPage.MatchPassword
            });
    }

    ionViewDidLoad() {
    }

    public registerButton() {
        this.userIsRegistered = true
    }

    public goToLoginButton() {
        console.log(1)
        this.onRegisterFinishEvent.emit('login');
        this.userIsRegistered = false
    }


    static MatchPassword(control: FormGroup) {

        let password: AbstractControl = control.controls.password; // to get value in input tag
        let password_repeat: AbstractControl = control.controls.password_repeat; // to get value in input tag

        if (password.value != '' && password_repeat.value != '') {
            if (password.value != password_repeat.value) {
                password_repeat.setErrors({ MatchPassword: true })
            } else {
                password_repeat.setErrors(null)
                return null
            }
        }

    }
}
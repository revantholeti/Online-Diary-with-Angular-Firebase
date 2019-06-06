import { AbstractControl } from '@angular/forms';

export function passwordValidation(control:AbstractControl):{[key:string]:boolean}|null{
    let password=control.get('password');
    let confirmpass = control.get('confirm_pass');
    if(password.pristine && confirmpass.pristine){
        return null;
    }
    return password && confirmpass && password.value !== confirmpass.value ?{'mismatch':true}:null;
}
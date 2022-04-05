import { Component, OnInit } from '@angular/core';
import { ValidatorService } from '../../../shared/validator/validator.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';

@Component({
  selector: 'app-registo',
  templateUrl: './registo.component.html',
  styles: [],
})
export class RegistoComponent implements OnInit {


  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.vs.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.vs.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  }, {
    validators: [this.vs.camposIguales('password', 'password2')]
  });

  get emailErrorMsg() {
    const errors = this.miFormulario.get("email")?.errors;
    let msg: string = ""
    if (errors?.['required']) {
      msg = 'Email es obligatorio'
    } else if (errors?.['pattern']) {
      msg = 'El valor no tiene formato de correo'
    } else if (errors?.['emailTomado']) {
      msg = 'El correo electrónico ya fue tomado'
    }
    return msg;
  }

  constructor(private fb: FormBuilder,
    private vs: ValidatorService,
    private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Paco Candela',
      email: 'test1@test.com',
      username: "paquito1",
      password: "123456",
      password2: "123456"
    });
  }

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }



  // emailRequired() {
  //   return this.miFormulario.get('email')?.errors?.['required']
  //     && this.miFormulario.get('email')?.touched;
  // }
  // emailFormato() {
  //   return this.miFormulario.get('email')?.errors?.['pattern']
  //     && this.miFormulario.get('email')?.touched;
  // }
  // emailTomado() {
  //   return this.miFormulario.get('email')?.errors?.['emailTomado']
  //     && this.miFormulario.get('email')?.touched;
  // }


  submitFormulario() {
    this.miFormulario.markAllAsTouched();
    console.log(this.miFormulario.value);
  }

}

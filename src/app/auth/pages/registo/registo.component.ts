import { Component, OnInit } from '@angular/core';
import { ValidatorService } from '../../../shared/validator/validator.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-registo',
  templateUrl: './registo.component.html',
  styles: [],
})
export class RegistoComponent implements OnInit {
  

  miFormulario: FormGroup = this.fb.group({
    nombre: [
      '',
      [Validators.required, Validators.pattern(this.vs.nombreApellidosPattern)],
    ],
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)]],
    username: ['', [Validators.required, this.vs.noPuedeSerStrider]],
    password: ['', [Validators.required,Validators.minLength(6)]], 
    password2: ['', [Validators.required]],
  },{
    Validators:[this.vs.camposIguales('password','password2')]
  });

  constructor(private fb: FormBuilder,private vs:ValidatorService) {}

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Paco Candela',
      email: 'test1@test.com',
      username:"paquito1"
    });
  }

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  submitFormulario() {
    this.miFormulario.markAllAsTouched();
  }
}

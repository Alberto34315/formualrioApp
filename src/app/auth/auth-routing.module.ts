import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistoComponent } from './pages/registo/registo.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistoComponent },
      { path: '**', redirectTo: 'registro' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

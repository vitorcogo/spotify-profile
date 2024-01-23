import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ComponentsRoutingModule } from './components.routing.module';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
  ],
  providers: [
    AuthService
  ]
})
export class ComponentsModule { }

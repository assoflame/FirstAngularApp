import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { DemoMaterialModule } from './demo-material/demo-material.module';
import { UsersComponent } from './components/users/users.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { JwtInterceptor } from './services/jwt-interceptor.service';
import { UserEditingComponent } from './components/user-editing/user-editing.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

@NgModule({
  declarations: [
    SignInFormComponent,
    SignUpFormComponent,
    UsersComponent,
    AppComponent,
    NavbarComponent,
    UserEditingComponent,
    StatisticsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    CommonModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true } ] ,
  bootstrap: [AppComponent],
})
export class AppModule {}

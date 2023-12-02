import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { MatCardModule } from '@angular/material/card';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatListModule } from '@angular/material/list';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { LoginComponent } from './components/login/login.component';
// import { SecondComponent } from './components/second/second.component';
//import { DemoMaterialModule } from './demo-material/demo-material.module';
// import { AdminComponent } from './components/admin/admin.component';
// import { HomeComponent } from './components/home/home.component';
// import { HomeModalComponent } from './components/home-modal/home-modal.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { DemoMaterialModule } from './demo-material/demo-material.module';
// import { RegisterComponent } from './components/register/register.component';
// import { SimpleDataComponent } from './simple-data/simple-data.component';
// import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

// @NgModule({
//   declarations: [AppComponent, LoginComponent, SecondComponent, AdminComponent, HomeComponent, HomeModalComponent],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     BrowserAnimationsModule,
//     FormsModule,
//     ReactiveFormsModule,
//     MatCardModule,
//     DemoMaterialModule,
//   ],
//   providers: [FakeBackendProvider],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}

@NgModule({
  declarations: [
    SignInFormComponent,
    SignUpFormComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    // MatCardModule,
    // MatInputModule,
    // MatIconModule,
    // MatButtonModule,
    // MatSidenavModule,
    // MatListModule,
    // MatDialogModule,
    // MatMenuModule,
    // MatToolbarModule,
    // MatButtonToggleModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [] ,
  bootstrap: [AppComponent],
})
export class AppModule {}

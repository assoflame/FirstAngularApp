import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router'
import { SignInFormComponent } from "./components/sign-in-form/sign-in-form.component";
import { SignUpFormComponent } from "./components/sign-up-form/sign-up-form.component";
import { adminGuard } from './guards/admin.guard';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [
    {
        path: 'signin',
        component: SignInFormComponent
    },
    {
        path: 'signup',
        component: SignUpFormComponent
    },
    {
        path: 'admin',
        component: UsersComponent,
        canActivate: [adminGuard]
    },
    {
        path: '**',
        redirectTo: '/'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
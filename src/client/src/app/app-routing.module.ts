import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router'
import { SignInFormComponent } from "./components/sign-in-form/sign-in-form.component";
import { SignUpFormComponent } from "./components/sign-up-form/sign-up-form.component";
import { adminGuard } from './guards/admin.guard';
import { UsersComponent } from './components/users/users.component';
import { UserEditingComponent } from './components/user-editing/user-editing.component';
import { StatisticsComponent } from './components/statistics/statistics.component';


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
        path: 'users',
        component: UsersComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'user-editing/:userId',
        component: UserEditingComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'statistics',
        component: StatisticsComponent
    },
    {
        path: '**',
        redirectTo: 'signin'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
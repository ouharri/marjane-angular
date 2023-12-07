import {Routes} from '@angular/router';
import {TestComponent} from "./shared/components/test/test.component";
import {LoginComponent} from "./pages/authentication/login/login.component";
import {RegisterComponent} from "./pages/authentication/register/register.component";
import {AddPromotionComponent} from "./pages/admin/add-promotion/add-promotion.component";
import {HomeComponent} from "./pages/admin/home/home.component";

export const routes: Routes = [
    {
        path: 'test',
        component: TestComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'admin',
        component: HomeComponent,
        children: [
            {path: 'add-promotion', component: AddPromotionComponent}
        ],
    },
    {
        path: '',
        component: LoginComponent,
        children: [
            {
                path: '',
                component: LoginComponent,
            }
        ]
    }

];

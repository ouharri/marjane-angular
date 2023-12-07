import {Routes} from '@angular/router';
import {TestComponent} from "./shared/components/test/test.component";
import {LoginComponent} from "./pages/authentication/login/login.component";
import {RegisterComponent} from "./pages/authentication/register/register.component";
import {PromotionComponent} from "./pages/admin/promotion/promotion.component";
import {HomeComponent} from "./pages/admin/home/home.component";
import {ValidationComponent} from "./pages/responsable/validation/validation.component";

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
            {
                path: '',
                component: HomeComponent,
            }
        ]
    },
    {
        path: 'admin/promotion',
        component: PromotionComponent
    },
    {
        path: 'rayon',
        component: ValidationComponent
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

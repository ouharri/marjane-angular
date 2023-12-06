import {Routes} from '@angular/router';
import {TestComponent} from "./shared/components/test/test.component";
import {LoginComponent} from "./pages/authentication/login/login.component";
import {RegisterComponent} from "./pages/authentication/register/register.component";

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

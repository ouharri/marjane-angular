import {provideAnimations} from "@angular/platform-browser/animations";
import {TuiRootModule} from "@taiga-ui/core";
import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(HttpClientModule, TuiRootModule),
        provideAnimations(),
        provideRouter(routes),
        provideClientHydration(),
        importProvidersFrom(TuiRootModule)]
};

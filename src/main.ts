import { LOCALE_ID, enableProdMode, importProvidersFrom, inject, provideAppInitializer } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { RouterModule, provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { appRoutes } from './app/app-routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { PICK_FORMATS, AppDateAdapter } from './app/shared/shared';
import { provideStore } from '@ngrx/store';
import { appReducers } from './app/state/app-reducer';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { metaReducers } from './app/state/state.config';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, withInterceptors} from '@angular/common/http';
import { tokenIntercepter } from './app/core/intercepter/token-intercepter.interceptor';
import { BACKEND_URL } from 'seventy-one-base';
import { KeycloakService } from 'keycloak-angular';
import { initializeSSOService } from './app/core/service/keycloak-utility';


if (environment.production) {
  enableProdMode();
}


bootstrapApplication(AppComponent, {

  providers: [
    provideHttpClient(
      // withInterceptorsFromDi()
      withInterceptors([
        tokenIntercepter
      ])
    ),
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      // withViewTransitions()
    ),
    provideAnimations(),
    provideStore(appReducers,{
      metaReducers,
      runtimeChecks:{
        strictStateImmutability: false,
        strictActionImmutability: false,
      }
    }),
    provideEffects(),
    provideRouterStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production , connectInZone: true}),
    // {
    //   provide : HTTP_INTERCEPTORS,
    //   useClass: TokenIntercepterInterceptor,
    //   multi   : true
    // },
    KeycloakService,
    provideAppInitializer(() => {
        const initializerFn = (initializeSSOService)(inject(KeycloakService));
        return initializerFn();
      }),
    { provide: LOCALE_ID, useValue: 'th-TH'},
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS},
    { provide: DateAdapter, useClass: AppDateAdapter},
    {
      provide : MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
          appearance: 'fill'
      }
    },
    {
      provide: BACKEND_URL,
      useValue: environment.baseapi
    }
  ]
}
)




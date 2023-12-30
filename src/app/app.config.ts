import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthService } from './core/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { provideHttpClient, withInterceptors, HttpClientModule } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';

registerLocaleData(en);

export function init(authService: AuthService) {
  return () => firstValueFrom(authService.authenticate());
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: init,
        deps: [AuthService],
    }, provideNzI18n(en_US), importProvidersFrom(FormsModule), importProvidersFrom(HttpClientModule),
    provideAnimations()
],
};

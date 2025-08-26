import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel, } from 'ngx-logger';
import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    LoggerModule.forRoot(
      {
        serverLoggingUrl: '/api/logs',
        level: NgxLoggerLevel.DEBUG,
        serverLogLevel: NgxLoggerLevel.ERROR
      }
    ).providers,
    ToastrModule.forRoot(
      {

      }
    ).providers
  ]
};

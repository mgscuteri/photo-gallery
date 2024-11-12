import {
  ApplicationConfig,
  importProvidersFrom,
  provideExperimentalZonelessChangeDetection,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { AlbumsService } from './services/albums.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom([BrowserAnimationsModule, NgxSpinnerModule]),
    { provide: APP_BASE_HREF, useValue: '' },
  ],
};

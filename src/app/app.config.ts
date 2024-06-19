import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './core/interceptors/token-interceptor.interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './pages/auth/store/auth.effects';
import { CategoryEffects } from './pages/cafe/store/effects/category.effects';
import { ProductEffects } from './pages/cafe/store/effects/product.effects';
import { CafeFeature } from './pages/cafe/store/cafe.reducer';
import { DashboardEffects } from './pages/cafe/store/effects/dashboard.effects';
import { AuthFeature } from './pages/auth/store/auth.reducer';
import { ManageOrderEffects } from './pages/cafe/store/effects/order.effects';
import { BillEffects } from './pages/cafe/store/effects/bill.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { CafeEffects } from './pages/cafe/store/effects/cafe.effects';
import { UserEffects } from './pages/cafe/store/effects/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(withInterceptors([tokenInterceptor])), provideAnimationsAsync(), provideStore(), provideState(AuthFeature), provideState(CafeFeature), provideEffects([AuthEffects, DashboardEffects, CategoryEffects, ProductEffects, ManageOrderEffects, BillEffects, CafeEffects, UserEffects]), provideStoreDevtools({
    maxAge: 25, // Retains last 25 states
    logOnly: !isDevMode(), // Restrict extension to log-only mode
    autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    trace: true, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
    traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    connectInZone: true // If set to true, the connection is established within the Angular zone
  })]
};
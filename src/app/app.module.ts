import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { environment } from '../environments/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './state/auth.state';
import { MaquetteModule } from './main/maquette/maquette.module';
import { MaquetteState } from './state/maquette.state';
import { MasterState } from './state/master.state';
import { AppConfigService } from './services/app-config.service';
import { ApiPrefixInterceptor } from './http/api-prefix.interceptor';
import { BearerInterceptor } from './http/bearer.interceptor';
import { UserLoggedGuard } from './guard/user-logged.guard';
import { UserNotLoggedGuard } from './guard/user-not-logged.guard';
import { MatSnackBarModule } from '@angular/material';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

const appRoutes: Routes = [
  {
    canActivate: [UserNotLoggedGuard],
    canActivateChild: [UserNotLoggedGuard],
    path: 'auth',
    loadChildren: () => import('./main/auth/auth.module').then(m => m.AuthModule),
  },
  {
    canActivate: [UserLoggedGuard],
    canActivateChild: [UserLoggedGuard],
    path: '',
    children: [
      {
        path: 'maquette',
        loadChildren: () => import('./main/maquette/maquette.module').then(m => m.MaquetteModule),
      },
      {
        path: 'master',
        loadChildren: () => import('./main/master/master.module').then(m => m.MasterModule),
      },

      {
        path: '**',
        redirectTo: 'maquette',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'maquette',
  },
];
const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),

    TranslateModule.forRoot(),

    // Material moment date module
    MatMomentDateModule,

    // Material
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,

    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,

    // NgXS
    NgxsModule.forRoot([AuthState, MaquetteState, MasterState], {
      developmentMode: !environment.production,
    }),
    NgxsDispatchPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    environment.production ? [] : NgxsLoggerPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: ['auth.token'],
    }),

    // App modules
    LayoutModule,
    SampleModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    AppConfigService,
    ApiPrefixInterceptor,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BearerInterceptor, multi: true },
  ],
  exports: [],
})
export class AppModule {}

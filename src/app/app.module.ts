import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  MessageFormatTranspiler,
  TRANSLOCO_CONFIG,
  TRANSLOCO_TRANSPILER,
  TranslocoConfig,
  TranslocoModule
} from '@ngneat/transloco';
import { TranslocoMessageFormatModule } from '@ngneat/transloco-message-format';
import { TRANSLOCO_PERSIST_LANG_STORAGE, TranslocoPersistLangModule } from '@ngneat/transloco-persist-lang';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { getLangFn } from './getLang';
import { HomeComponent } from './home/home.component';
import { httpLoader } from './loaders/http.loader';
import { OnPushComponent } from './on-push/on-push.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, OnPushComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslocoModule,
    HttpClientModule,
    TranslocoPersistLangModule.init({
      getLangFn,
      storage: {
        provide: TRANSLOCO_PERSIST_LANG_STORAGE,
        useValue: localStorage
      }
    }),
    TranslocoMessageFormatModule
    // TranslocoPersistTranslationsModule.init({
    //   loader: HttpLoader,
    //   storage: {
    //     provide: PERSIST_TRANSLATIONS_STORAGE,
    //     useValue: localStorage
    //   }
    // })
  ],
  providers: [
    httpLoader,
    {
      provide: TRANSLOCO_CONFIG,
      useValue: {
        prodMode: environment.production,
        listenToLangChange: true,
        fallbackLang: 'es',
        defaultLang: 'en',
        scopeStrategy: 'shared',
        scopeMapping: {
          'todos-page': 'todos',
          'transpilers/messageformat': 'mf'
        }
      } as TranslocoConfig
    }
    // { provide: TRANSLOCO_TRANSPILER, useClass: MessageFormatTranspiler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

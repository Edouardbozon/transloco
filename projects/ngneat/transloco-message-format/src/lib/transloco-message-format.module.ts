import { NgModule, ModuleWithProviders } from '@angular/core';
import { TRANSLOCO_TRANSPILER } from '@ngneat/transloco';
import { TranslocoMessageFormat } from './transloco-message-format';
import { TRANSLOCO_MESSAGE_FORMAT_CONFIG, TranslocoMessageFormatConfig } from './transloco-message-format.config';

export function translocoMessageFormatFactory(config: TranslocoMessageFormatConfig) {
  return new TranslocoMessageFormat(config);
}

@NgModule({
  providers: [
    {
      provide: TRANSLOCO_TRANSPILER,
      useClass: TranslocoMessageFormat
    }
  ]
})
export class TranslocoMessageFormatModule {
  static init(config: TranslocoMessageFormatConfig): ModuleWithProviders {
    return {
      ngModule: TranslocoMessageFormatModule,
      providers: [
        { provide: TRANSLOCO_MESSAGE_FORMAT_CONFIG, useValue: config },
        {
          provide: TRANSLOCO_TRANSPILER,
          useClass: TranslocoMessageFormat
        }
      ]
    };
  }

  constructor() {}
}

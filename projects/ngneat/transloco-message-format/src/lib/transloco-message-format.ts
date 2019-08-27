import { Injectable, Inject, Optional } from '@angular/core';
import { DefaultTranspiler, HashMap, Translation } from '@ngneat/transloco';

import * as MessageFormat from 'messageformat';
import { TranslocoMessageFormatConfig, TRANSLOCO_MESSAGE_FORMAT_CONFIG } from './transloco-message-format.config';

@Injectable()
export class TranslocoMessageFormat extends DefaultTranspiler {
  private messageFormat: MessageFormat;

  constructor(@Optional() @Inject(TRANSLOCO_MESSAGE_FORMAT_CONFIG) config: TranslocoMessageFormatConfig) {
    super();
    const { locales, ...messageConfig } = config || { locales: undefined };
    //@ts-ignore
    this.messageFormat = new MessageFormat(locales, messageConfig);
  }

  transpile(value: string, params: HashMap<any> = {}, translation: Translation): string {
    if (!value) {
      return value;
    }

    const transpiled = super.transpile(value, params, translation);
    const message = this.messageFormat.compile(transpiled);

    return message(params);
  }
}

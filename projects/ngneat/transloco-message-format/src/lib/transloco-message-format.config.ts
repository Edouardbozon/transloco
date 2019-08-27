import { InjectionToken } from '@angular/core';

import * as MessageFormat from 'messageformat';

export const TRANSLOCO_MESSAGE_FORMAT_CONFIG = new InjectionToken<TranslocoMessageFormatConfig>(
  'TRANSLOCO_MESSAGE_FORMAT_CONFIG'
);

export interface TranslocoMessageFormatConfig extends MessageFormat.Options {
  locales?: { [locale: string]: Function } | string[] | string;
}

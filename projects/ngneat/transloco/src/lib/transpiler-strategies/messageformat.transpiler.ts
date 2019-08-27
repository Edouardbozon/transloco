import { TranslocoTranspiler, DefaultTranspiler } from '../transloco.transpiler';
import { HashMap, Translation } from '../types';

import * as MessageFormat from 'messageformat';

// TODO: remove for version 2.0 along with messageformat dependency.
// @deprecated
export class MessageFormatTranspiler implements TranslocoTranspiler {
  defaultTranspiler: DefaultTranspiler = new DefaultTranspiler();
  //@ts-ignore
  messageFormat: MessageFormat = new MessageFormat();

  transpile(value: string, params: HashMap = {}, translation: Translation): string {
    if (!value) {
      return value;
    }

    const transpiled = this.defaultTranspiler.transpile(value, params, translation);
    const message = this.messageFormat.compile(transpiled);

    return message(params);
  }
}

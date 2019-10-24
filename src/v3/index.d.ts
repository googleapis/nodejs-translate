import {GoogleAuthOptions} from 'google-auth-library';
import {Service, util, Metadata} from '@google-cloud/common';

export interface TranslateConfig extends GoogleAuthOptions {
  key?: string;
  autoRetry?: boolean;
  maxRetries?: number;
  /**
   * The API endpoint of the service used to make requests.
   * Defaults to `translation.googleapis.com`.
   */
  apiEndpoint?: string;
}

export class Translate extends Service {
  constructor(options?: TranslateConfig);
  detect(input: any): any;
  translate(input: any, opts: any): any;
  getLanguage(): any;
  getLanguages(): any;
}

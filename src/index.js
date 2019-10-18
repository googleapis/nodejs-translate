// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @namespace google
 */
/**
 * @namespace google.cloud
 */
/**
 * @namespace google.cloud.translate
 */
/**
 * @namespace google.cloud.translate.v3
 */

'use strict';

// Import the clients for each version supported by this package.
const gapic = Object.freeze({
  v3: require('./v3'),
});

/**
 * The `@google-cloud/translate` package has the following named exports:
 *
 * - `TranslationServiceClient` - Reference to
 *   {@link v3.TranslationServiceClient}
 * - `v3` - This is used for selecting or pinning a
 *   particular backend service version. It exports:
 *     - `TranslationServiceClient` - Reference to
 *       {@link v3.TranslationServiceClient}
 *
 * @module {object} @google-cloud/translate
 * @alias nodejs-translate
 *
 * @example <caption>Install the client library with <a href="https://www.npmjs.com/">npm</a>:</caption>
 * npm install --save @google-cloud/translate
 *
 * @example <caption>Import the client library:</caption>
 * const translate = require('@google-cloud/translate');
 *
 * @example <caption>Create a client that uses <a href="https://goo.gl/64dyYX">Application Default Credentials (ADC)</a>:</caption>
 * const client = new translate.TranslationServiceClient();
 *
 * @example <caption>Create a client with <a href="https://goo.gl/RXp6VL">explicit credentials</a>:</caption>
 * const client = new translate.TranslationServiceClient({
 *   projectId: 'your-project-id',
 *   keyFilename: '/path/to/keyfile.json',
 * });
 */

/**
 * @type {object}
 * @property {constructor} TranslationServiceClient
 *   Reference to {@link v3.TranslationServiceClient}
 */
module.exports = gapic.v3;

/**
 * @type {object}
 * @property {constructor} TranslationServiceClient
 *   Reference to {@link v3.TranslationServiceClient}
 */
module.exports.v3 = gapic.v3;

// Alias `module.exports` as `module.exports.default`, for future-proofing.
module.exports.default = Object.assign({}, module.exports);

// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


'use strict';

function main(parent) {
  // [START translate_v3_generated_TranslationService_ListGlossaries_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The name of the project from which to list all of the glossaries.
   */
  // const parent = 'abc123'
  /**
   *  Optional. Requested page size. The server may return fewer glossaries than
   *  requested. If unspecified, the server picks an appropriate default.
   */
  // const pageSize = 1234
  /**
   *  Optional. A token identifying a page of results the server should return.
   *  Typically, this is the value of ListGlossariesResponse.next_page_token 
   *  returned from the previous call to `ListGlossaries` method.
   *  The first page is returned if `page_token`is empty or missing.
   */
  // const pageToken = 'abc123'
  /**
   *  Optional. Filter specifying constraints of a list operation.
   *  Specify the constraint by the format of "key=value", where key must be
   *  "src" or "tgt", and the value must be a valid language code.
   *  For multiple restrictions, concatenate them by "AND" (uppercase only),
   *  such as: "src=en-US AND tgt=zh-CN". Notice that the exact match is used
   *  here, which means using 'en-US' and 'en' can lead to different results,
   *  which depends on the language code you used when you create the glossary.
   *  For the unidirectional glossaries, the "src" and "tgt" add restrictions
   *  on the source and target language code separately.
   *  For the equivalent term set glossaries, the "src" and/or "tgt" add
   *  restrictions on the term set.
   *  For example: "src=en-US AND tgt=zh-CN" will only pick the unidirectional
   *  glossaries which exactly match the source language code as "en-US" and the
   *  target language code "zh-CN", but all equivalent term set glossaries which
   *  contain "en-US" and "zh-CN" in their language set will be picked.
   *  If missing, no filtering is performed.
   */
  // const filter = 'abc123'

  // Imports the Translation library
  const {TranslationServiceClient} = require('@google-cloud/translate').v3;

  // Instantiates a client
  const translationClient = new TranslationServiceClient();

  async function callListGlossaries() {
    // Construct request
    const request = {
      parent,
    };

    // Run request
    const iterable = await translationClient.listGlossariesAsync(request);
    for await (const response of iterable) {
        console.log(response);
    }
  }

  callListGlossaries();
  // [END translate_v3_generated_TranslationService_ListGlossaries_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));

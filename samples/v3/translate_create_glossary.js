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

'use strict';

function main(
  projectId = 'YOUR_PROJECT_ID',
  location = 'us-central1',
  glossaryId = 'glossary-id'
) {
  // [START translate_v3_create_glossary]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const projectId = 'YOUR_PROJECT_ID';
  // const location = 'global';
  // const glossaryId = 'YOUR_GLOSSARY_ID';

  // Imports the Google Cloud Translation library
  const {TranslationServiceClient} = require('@google-cloud/translate');

  // Instantiates a client
  const translationClient = new TranslationServiceClient();

  async function createGlossary() {
    // Construct glossary
    const glossary = {
      languageCodesSet: {
        languageCodes: ['en', 'es'],
      },
      inputConfig: {
        gcsSource: {
          inputUri: 'gs://cloud-samples-data/translation/glossary.csv',
        },
      },
      name: `projects/${projectId}/locations/${location}/glossaries/${glossaryId}`,
    };

    // Construct request
    const request = {
      parent: `projects/${projectId}/locations/${location}`,
      glossary: glossary,
    };

    // Create glossary using a long-running operation
    // and wait for its completion
    return await translationClient
      .createGlossary(request)
      .then(responses => {
        const operation = responses[0];
        return operation.promise();
      })
      .then(response => {
        const glossary = response[0];
        console.log('Created glossary:');
        console.log(`InputUri ${glossary.inputConfig.gcsSource.inputUri}`);
      })
      .catch(error => {
        console.error('Error: ' + error.details);
      });
  }

  createGlossary();
  // [END translate_v3_create_glossary]
}

main(...process.argv.slice(2));

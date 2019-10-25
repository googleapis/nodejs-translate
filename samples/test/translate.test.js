// Copyright 2017 Google LLC
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

const {assert} = require('chai');
const cp = require('child_process');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'}).trim();
const cmd = 'node translate.js';
const text = 'Hello world!';
const text2 = 'Goodbye!';
const model = 'nmt';
const toLang = 'ru';

describe('translate sample tests', () => {
  it('should detect language of a single string', async () => {
    const output = execSync(`${cmd} detect "${text}"`);
    const expected = new RegExp(`Detections:\n\t${text} => en`);
    assert.match(output, expected);
  });

  it('should detect language of multiple strings', async () => {
    const output = execSync(`${cmd} detect "${text}" "${text2}"`);
    const expected = new RegExp(
      `Detections:\n\t${text} => en\n\t${text2} => en`
    );
    assert.match(output, expected);
  });

  it('should list languages', () => {
    const output = execSync(`${cmd} list`);
    assert.match(output, /Languages:/);
    assert.match(output, new RegExp('languageCode = af'));
  });

  it('should list languages with a target', () => {
    const output = execSync(`${cmd} list es`);
    assert.match(output, /Languages:/);
    assert.include(output, 'languageCode = af\tdisplayName = afrikáans');
  });

  it('should translate a single string', async () => {
    const output = execSync(`${cmd} translate ${toLang} "${text}"`);
    const expected = `Translations:\n\t${text} => (${toLang}) Привет, мир!`;
    assert.strictEqual(output, expected);
  });

  it('should translate multiple strings', async () => {
    const output = execSync(`${cmd} translate ${toLang} "${text}" "${text2}"`);
    const expected = `Translations:\n\t${text} => (${toLang}) Привет, мир!\n\t${text2} => (${toLang}) До свидания!`;
    assert.strictEqual(output, expected);
  });

  it('should translate a single string with a model', async () => {
    const output = execSync(
      `${cmd} translate-with-model ${toLang} ${model} "${text}"`
    );
    const expected = `Translations:\n\t${text} => (${toLang}) Привет, мир!`;
    assert.strictEqual(output, expected);
  });

  it('should translate multiple strings with a model', async () => {
    const output = execSync(
      `${cmd} translate-with-model ${toLang} ${model} "${text}" "${text2}"`
    );
    const expected = `Translations:\n\t${text} => (${toLang}) Привет, мир!\n\t${text2} => (${toLang}) До свидания!`;
    assert.strictEqual(output, expected);
  });
});

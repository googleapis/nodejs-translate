#!/bin/bash

# Copyright 2021 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Create files to be uploaded to devsite. 
# When running locally, run `docfx --serve` in ./markdown/ after this script

mkdir ./etc

npm install
npm run api-extractor
npm run api-documenter

# # Clean up TOC
# # Delete SharePoint item, see https://github.com/microsoft/rushstack/issues/1229
# sed -i -e '1,3d' ./markdown/toc.yml
# sed -i -e 's/^    //' ./markdown/toc.yml
# # Delete interfaces from TOC (name and uid)
# sed -i -e '/name: I[A-Z]/{N;d;}' ./markdown/toc.yml
# sed -i -e '/^ *\@google-cloud.*:interface/d' ./markdown/toc.yml

# ## Add "items:" to short toc for overview file
# if [[ $(wc -l <./markdown/toc.yml) -le 3 ]] ; then
#   sed -i -e '3a\
#  \ \ \ items:
# ' ./markdown/toc.yml
# fi

# # Add overview section
# sed -i -e '4a\
#  \ \ \ \ \ - name: Overview
# ' ./markdown/toc.yml
# sed -i -e '5a\
#  \ \ \ \ \ \ \ homepage: index.md
# ' ./markdown/toc.yml


NAME=$(ls temp | sed s/.api.json*//)

# ## Delete the default overvew page,
# ## otherwise anchors are added and they break left nav
# rm ./markdown/$NAME.yml

## Copy everything to devsite
mkdir ./_devsite
mkdir ./_devsite/$NAME

# cp ./markdown/$NAME/* ./_devsite/$NAME || :
# cp ./markdown/toc.md ./_devsite/toc.md

## readme is not allowed as filename
cp ./README.md ./_devsite/index.md


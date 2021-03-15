# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""This script is used to synthesize generated parts of this library."""

import synthtool as s
import synthtool.gcp as gcp
import synthtool.languages.node as node
from synthtool import _tracked_paths
import logging
from pathlib import Path
import json
import shutil

staging = Path('owl-bot-staging')
if staging.is_dir():
  # Load the default version defined in .repo-metadata.json.
  default_version = json.load(open('.repo-metadata.json', 'rt'))['default_version']
  # Collect the subdirectories of the staging directory.
  versions = [v.name for v in staging.iterdir() if v.is_dir()]
  # Reorder the versions so the default version always comes last.
  versions = [v for v in versions if v != default_version] + [default_version]

  for version in versions:
    library = staging / version
    _tracked_paths.add(library)
    s.copy(library, excludes=['README.md', 'package.json', 'src/index.ts'])
  shutil.rmtree(staging)

logging.basicConfig(level=logging.DEBUG)

common_templates = gcp.CommonTemplates()
templates = common_templates.node_library(source_location='build/src')
s.copy(templates, excludes=[])

node.postprocess_gapic_library_hermetic()

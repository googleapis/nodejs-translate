/**
 * Copyright 2018, Google, LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * This application demonstrates how to perform basic operations on model
 * with the Google AutoML Translation API.
 *
 * For more information, see the documentation at
 * https://cloud.google.com/translate/automl/docs
 */

`use strict`;

function createModel(projectId, computeRegion, datasetId, modelName) {
  // [START automl_translation_create_model]
  const automl = require(`@google-cloud/automl`);

  const client = new automl.v1beta1.AutoMlClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const projectId = `The GCLOUD_PROJECT string, e.g. "my-gcloud-project"`;
  // const computeRegion = `region-name, e.g. "us-central1"`;
  // const datasetId = `Id of the dataset`;
  // const modelName = `Name of the model, e.g. "myModel"`;

  // A resource that represents Google Cloud Platform location.
  const projectLocation = client.locationPath(projectId, computeRegion);

  // Set model name and dataset.
  const myModel = {
    displayName: modelName,
    datasetId: datasetId,
    translationModelMetadata: {},
  };

  // Create a model with the model metadata in the region.
  client
    .createModel({parent: projectLocation, model: myModel})
    .then(responses => {
      const operation = responses[0];
      const initialApiResponse = responses[1];

      console.log(`Training operation name: `, initialApiResponse.name);
      console.log(`Training started...`);
      return operation.promise();
    })
    .then(responses => {
      // The final result of the operation.
      const model = responses[0];
      console.log(model);
      // Retrieve deployment state.
      var deploymentState = ``;
      if (model.deploymentState === 1) {
        deploymentState = `deployed`;
      } else if (model.deploymentState === 2) {
        deploymentState = `undeployed`;
      }

      // Display the model information.
      console.log(`Model name: ${model.name}`);
      console.log(`Model id: ${model.name.split(`/`).pop(-1)}`);
      console.log(`Model display name: ${model.displayName}`);
      console.log(`Model create time:`);
      console.log(`\tseconds: ${model.createTime.seconds}`);
      console.log(`\tnanos: ${model.createTime.nanos}`);
      console.log(`Model deployment state: ${deploymentState}`);
    })
    .catch(err => {
      console.error(err);
    });
  // [END automl_translation_create_model]
}

function listModels(projectId, computeRegion, filter_) {
  // [START automl_translation_list_models]
  const automl = require(`@google-cloud/automl`);

  const client = new automl.v1beta1.AutoMlClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const projectId = `The GCLOUD_PROJECT string, e.g. "my-gcloud-project"`;
  // const computeRegion = `region-name, e.g. "us-central1"`;
  // const filter_ = `filter expressions, must specify field, e.g. "translationDatasetMetadata:*”`;

  // A resource that represents Google Cloud Platform location.
  const projectLocation = client.locationPath(projectId, computeRegion);

  // List all the models available in the region by applying filter.
  client
    .listModels({parent: projectLocation, filter: filter_})
    .then(responses => {
      const model = responses[0];

      // Display the model information.
      console.log(`List of models:`);
      for (let i of model) {
        console.log(`Model name: ${i.name}`);
        console.log(`Model id: ${i.name.split(`/`).pop(-1)}`);
        console.log(`Model display name: ${i.displayName}`);
        console.log(`Model dataset id: ${i.datasetId}`);
        console.log(`Model create time:`);
        console.log(`\tseconds: ${i.createTime.seconds}`);
        console.log(`\tnanos: ${i.createTime.nanos}`);
        console.log(`Model update time:`);
        console.log(`\tseconds: ${i.updateTime.seconds}`);
        console.log(`\tnanos: ${i.updateTime.nanos}`);
        console.log(`Model deployment state: ${i.deploymentState}`);
        console.log(`\n`);
      }
    })
    .catch(err => {
      console.error(err);
    });
  // [END automl_translation_list_models]
}

function getModel(projectId, computeRegion, modelId) {
  // [START automl_translation_get_model]
  const automl = require(`@google-cloud/automl`);

  const client = new automl.v1beta1.AutoMlClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const projectId = `The GCLOUD_PROJECT string, e.g. "my-gcloud-project"`;
  // const computeRegion = `region-name, e.g. "us-central1"`;
  // const modelId = `id of the model, e.g. “ICN12345”`;

  // Get the full path of the model.
  const modelFullId = client.modelPath(projectId, computeRegion, modelId);

  // Get complete detail of the model.
  client
    .getModel({name: modelFullId})
    .then(responses => {
      const model = responses[0];

      // Display the model information.
      console.log(`Model name: ${model.name}`);
      console.log(`Model id: ${model.name.split(`/`).pop(-1)}`);
      console.log(`Model display name: ${model.displayName}`);
      console.log(`Model dataset id: ${model.datasetId}`);
      if (model.modelMetadata === `translationModelMetadata`) {
        console.log(`Translation model metadata:`);
        console.log(
          `\tBase model: ${model.translationModelMetadata.baseModel}`
        );
        console.log(
          `\tSource language code: ${
            model.translationModelMetadata.sourceLanguageCode
          }`
        );
        console.log(
          `\tTarget language code: ${
            model.translationModelMetadata.targetLanguageCode
          }`
        );
      } else if (model.modelMetadata === `textClassificationModelMetadata`) {
        console.log(
          `Text classification model metadata: ${
            model.textClassificationModelMetadata
          }`
        );
      } else if (model.modelMetadata === `imageClassificationModelMetadata`) {
        console.log(`Image classification model metadata:`);
        console.log(
          `\tBase model id: ${
            model.imageClassificationModelMetadata.baseModelId
          }`
        );
        console.log(
          `\tTrain budget: ${
            model.imageClassificationModelMetadata.trainBudget
          }`
        );
        console.log(
          `\tTrain cost: ${model.imageClassificationModelMetadata.trainCost}`
        );
        console.log(
          `\tStop reason: ${model.imageClassificationModelMetadata.stopReason}`
        );
      }
      console.log(`Model create time:`);
      console.log(`\tseconds: ${model.createTime.seconds}`);
      console.log(`\tnanos: ${model.createTime.nanos}`);
      console.log(`Model update time:`);
      console.log(`\tseconds: ${model.updateTime.seconds}`);
      console.log(`\tnanos: ${model.updateTime.nanos}`);
      console.log(`Model deployment state: ${model.deploymentState}`);
    })
    .catch(err => {
      console.error(err);
    });
  // [END automl_translation_get_model]
}

function listModelEvaluations(projectId, computeRegion, modelId, filter_) {
  // [START automl_translation_list_model_evaluations]
  const automl = require(`@google-cloud/automl`);

  const client = new automl.v1beta1.AutoMlClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const projectId = `The GCLOUD_PROJECT string, e.g. "my-gcloud-project"`;
  // const computeRegion = `region-name, e.g. "us-central1"`;
  // const modelId = `id of the model, e.g. “ICN12345”`;
  // const filter_ = `filter expressions, must specify field, e.g. “imageClassificationModelMetadata:*”`;

  // Get the full path of the model.
  const modelFullId = client.modelPath(projectId, computeRegion, modelId);

  // List all the model evaluations in the model by applying filter.
  client
    .listModelEvaluations({parent: modelFullId, filter: filter_})
    .then(responses => {
      const element = responses[0];
      console.log(`List of model evaluations:`);
      for (let i of element) {
        console.log(i);
      }
    })
    .catch(err => {
      console.error(err);
    });
  // [END automl_translation_list_model_evaluations]
}

function getModelEvaluation(
  projectId,
  computeRegion,
  modelId,
  modelEvaluationId
) {
  // [START automl_translation_get_model_evaluation]
  const automl = require(`@google-cloud/automl`);

  const client = new automl.v1beta1.AutoMlClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const projectId = `The GCLOUD_PROJECT string, e.g. "my-gcloud-project"`;
  // const computeRegion = `region-name, e.g. "us-central1"`;
  // const modelId = `id of the model, e.g. “ICN12345”`;
  // const modelEvaluationId = `Id of your model evaluation, e.g “ICN12345”

  // Get the full path of the model evaluation.
  const modelEvaluationFullId = client.modelEvaluationPath(
    projectId,
    computeRegion,
    modelId,
    modelEvaluationId
  );

  // Get complete detail of the model evaluation.
  client
    .getModelEvaluation({name: modelEvaluationFullId})
    .then(responses => {
      const response = responses[0];
      console.log(response);
    })
    .catch(err => {
      console.error(err);
    });
  // [END automl_translation_get_model_evaluation]
}

function deleteModel(projectId, computeRegion, modelId) {
  // [START automl_translation_delete_model]
  const automl = require(`@google-cloud/automl`);

  const client = new automl.v1beta1.AutoMlClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const projectId = `The GCLOUD_PROJECT string, e.g. "my-gcloud-project"`;
  // const computeRegion = `region-name, e.g. "us-central1"`;
  // const modelId = `id of the model, e.g. “ICN12345”`;

  // Get the full path of the model.
  const modelFullId = client.modelPath(projectId, computeRegion, modelId);

  // Delete a model.
  client
    .deleteModel({name: modelFullId})
    .then(responses => {
      const operation = responses[0];
      return operation.promise();
    })
    .then(responses => {
      // The final result of the operation.
      if (responses[2].done === true) console.log(`Model deleted.`);
    })
    .catch(err => {
      console.error(err);
    });
  // [END automl_translation_delete_model]
}

function getOperationStatus(operationFullId) {
  // [START automl_translation_get_operation_status]
  const automl = require(`@google-cloud/automl`);

  const client = new automl.v1beta1.AutoMlClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const operationFullId = `Full name of an operation, eg. “Projects/<projectId>/locations/us-central1/operations/<operationId>

  // Get the latest state of a long-running operation.
  client.operationsClient.getOperation(operationFullId).then(responses => {
    const response = responses[0];
    console.log(`Operation status: ${response}`);
  });
  // [END automl_translation_get_operation_status]
}

require(`yargs`)
  .demand(1)
  .options({
    computeRegion: {
      alias: `c`,
      type: `string`,
      default: process.env.REGION_NAME,
      requiresArg: true,
      description: `region name e.g. "us-central1"`,
    },
    datasetId: {
      alias: `i`,
      type: `string`,
      requiresArg: true,
      description: `Id of the dataset`,
    },
    filter_: {
      alias: `f`,
      default: ``,
      type: `string`,
      requiresArg: true,
      description: `Name of the Dataset to search for`,
    },
    modelName: {
      alias: `m`,
      type: `string`,
      default: false,
      requiresArg: true,
      description: `Name of the model`,
    },
    modelId: {
      alias: `a`,
      type: `string`,
      default: ``,
      requiresArg: true,
      description: `Id of the model`,
    },
    modelEvaluationId: {
      alias: `e`,
      type: `string`,
      default: ``,
      requiresArg: true,
      description: `Id of the model evaluation`,
    },
    operationFullId: {
      alias: `o`,
      type: `string`,
      default: ``,
      requiresArg: true,
      description: `Full name of an operation`,
    },
    projectId: {
      alias: `z`,
      type: `number`,
      default: process.env.GCLOUD_PROJECT,
      requiresArg: true,
      description: `The GCLOUD_PROJECT string, e.g. "my-gcloud-project"`,
    },
  })
  .command(`createModel`, `creates a new Model`, {}, opts =>
    createModel(
      opts.projectId,
      opts.computeRegion,
      opts.datasetId,
      opts.modelName
    )
  )
  .command(`getOperationStatus`, `Gets status of current operation`, {}, opts =>
    getOperationStatus(opts.operationFullId)
  )
  .command(`listModels`, `list all Models`, {}, opts =>
    listModels(opts.projectId, opts.computeRegion, opts.filter_)
  )
  .command(`getModel`, `Get a Model`, {}, opts =>
    getModel(opts.projectId, opts.computeRegion, opts.modelId)
  )
  .command(`listModelEvaluations`, `List model evaluations`, {}, opts =>
    listModelEvaluations(
      opts.projectId,
      opts.computeRegion,
      opts.modelId,
      opts.filter_
    )
  )
  .command(`getModelEvaluation`, `Get model evaluation`, {}, opts =>
    getModelEvaluation(
      opts.projectId,
      opts.computeRegion,
      opts.modelId,
      opts.modelEvaluationId
    )
  )
  .command(`deleteModel`, `Delete a Model`, {}, opts =>
    deleteModel(opts.projectId, opts.computeRegion, opts.modelId)
  )
  .example(`node $0 createModel -i "DatasetID" -m "myModelName"`)
  .example(`node $0 getOperationStatus -i "datasetId" -o "OperationFullID"`)
  .example(`node $0 listModels -f "translationModelMetadata:*"`)
  .example(`node $0 getModel -a "ModelID"`)
  .example(`node $0 listModelEvaluations -a "ModelID"`)
  .example(`node $0 getModelEvaluation -a "ModelId" -e "ModelEvaluationID"`)
  .example(`node $0 deleteModel -a "ModelID"`)
  .wrap(120)
  .recommendCommands()
  .help()
  .strict().argv;

//import "./lib/axios/dist/axios.standalone.js"
//import "./lib/CryptoJS/rollups/hmac-sha256.js"
//import "./lib/CryptoJS/rollups/sha256.js"
//import "./lib/CryptoJS/components/hmac.js"
//import "./lib/CryptoJS/components/enc-base64.js"
//import "./lib/url-template/url-template.js"
//import "./lib/apiGatewayCore/sigV4Client.js"
//import "./lib/apiGatewayCore/apiGatewayClient.js"
//import "./lib/apiGatewayCore/simpleHttpClient.js"
//import "./lib/apiGatewayCore/utils.js"

// ---

import { APIGatewayClient, Utils, uritemplate } from 'aws-api-client'
var utils = new Utils();

/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

export var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }


    // extract endpoint and path from url
    var invokeUrl = 'https://fpfnkzp3zd.execute-api.us-east-1.amazonaws.com/dev';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    //var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    var apiGatewayClient = new APIGatewayClient(simpleHttpClientConfig, sigV4ClientConfig);

    apigClient.authGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        utils.assertParametersDefined(params, ['x-ccp-authorization'], ['body']);

        var authGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/auth').expand(utils.parseParametersToObject(params, [])),
            headers: utils.parseParametersToObject(params, ['x-ccp-authorization']),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(authGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.authOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        utils.assertParametersDefined(params, [], ['body']);

        var authOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/auth').expand(utils.parseParametersToObject(params, [])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(authOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.characterGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        utils.assertParametersDefined(params, ['Authorization'], ['body']);

        var characterGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/character').expand(utils.parseParametersToObject(params, [])),
            headers: utils.parseParametersToObject(params, ['Authorization']),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(characterGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.characterOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        utils.assertParametersDefined(params, [], ['body']);

        var characterOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/character').expand(utils.parseParametersToObject(params, [])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(characterOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fleetGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        utils.assertParametersDefined(params, [], ['body']);

        var fleetGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/fleet').expand(utils.parseParametersToObject(params, [])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fleetGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fleetPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        utils.assertParametersDefined(params, [], ['body']);

        var fleetPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/fleet').expand(utils.parseParametersToObject(params, [])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fleetPutRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.inventoryGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        utils.assertParametersDefined(params, [], ['body']);

        var inventoryGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/inventory').expand(utils.parseParametersToObject(params, [])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(inventoryGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.inventoryPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        utils.assertParametersDefined(params, [], ['body']);

        var inventoryPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/inventory').expand(utils.parseParametersToObject(params, [])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(inventoryPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.inventoryOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        utils.assertParametersDefined(params, [], ['body']);

        var inventoryOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/inventory').expand(utils.parseParametersToObject(params, [])),
            headers: utils.parseParametersToObject(params, []),
            queryParams: utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(inventoryOptionsRequest, authType, additionalParams, config.apiKey);
    };


    return apigClient;
};

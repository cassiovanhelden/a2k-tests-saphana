const path = require('path');
const { sapHanaConfig } = require("../../config");
const { password } = sapHanaConfig;
module.exports = {
    integrations: {
        integration: {
            settings: {
                name: 'SAP Hana',
                pathToFile: path.resolve(__dirname, '../data/saphana.mapp'),
                configuration: {
                    "configuration": {
                        "baseUrl": "https://my305939.s4hana.ondemand.com/sap/opu/odata/sap/",
                        "iconUrl": "",
                        "iconType": "CUSTOM_IMAGE",
                        "useOnPremProxy": false,
                        "onPremProxyResource": "",
                        "security": {
                            "type": "BASIC",
                            "username": 'A2K_PARTNER_INT_USER',
                            "password": "{{secret 'dataEndpoint.password'}}"
                        },
                        "useServiceActionSecurity": false,
                        "schedule" : [ {
                            "synchronizationTypeId" : "FullSynchronization",
                            "scheduleDOW" : "FRI",
                            "useTimeRange" : true,
                            "runFrom" : "00:00",
                            "runTo" : "04:00",
                            "schedule" : "WEEKLY"
                        }, {
                            "synchronizationTypeId" : "IncrementalSynchronization",
                            "useTimeRange" : true,
                            "runFrom" : "00:00",
                            "runTo" : "04:00",
                            "schedule" : "DAILY"
                        } ]
                    },
                    "serviceType": "GWSC",
                    "title": "SAP Hana",
                    "schedule" : [ {
                        "synchronizationTypeId" : "FullSynchronization",
                        "scheduleDOW" : "FRI",
                        "useTimeRange" : true,
                        "runFrom" : "00:00",
                        "runTo" : "04:00",
                        "schedule" : "WEEKLY"
                    }, {
                        "synchronizationTypeId" : "IncrementalSynchronization",
                        "useTimeRange" : true,
                        "runFrom" : "00:00",
                        "runTo" : "04:00",
                        "schedule" : "DAILY"
                    } ]
                },
                secrets:{
                    "secrets": [
                        {
                            "name": "dataEndpoint.password",
                            "value": password
                        }
                    ]
                },
            },
            microapps: {
                'Create Time Entry': {
                    subscribers: ['a2kadminusr@a2kpartners.com'],
                },
                'Time Clock': {
                    subscribers: ['a2kadminusr@a2kpartners.com'],
                },
            },
        },
    },
};
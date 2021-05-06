export const schema = {
    "models": {
        "CUSTOMER3RDPARTY": {
            "name": "CUSTOMER3RDPARTY",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "Application": {
                    "name": "Application",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "ApplicationSync": {
                    "name": "ApplicationSync",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "ApplicationRefreshToken": {
                    "name": "ApplicationRefreshToken",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ApplicationTokenExpiryDate": {
                    "name": "ApplicationTokenExpiryDate",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "ApplicationAccessToken": {
                    "name": "ApplicationAccessToken",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "customer360dslID": {
                    "name": "customer360dslID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "CUSTOMER3RDPARTIES",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byCUSTOMER360DSL",
                        "fields": [
                            "customer360dslID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "ACTIVITIESTP": {
            "name": "ACTIVITIESTP",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "TPActivityId": {
                    "name": "TPActivityId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "TPActivityOwnerId": {
                    "name": "TPActivityOwnerId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "TPActivityDescription": {
                    "name": "TPActivityDescription",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "TPActivityType": {
                    "name": "TPActivityType",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "TPActivityDate": {
                    "name": "TPActivityDate",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": true,
                    "attributes": []
                },
                "TPActivityMovingTime": {
                    "name": "TPActivityMovingTime",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "TPActivityDistance": {
                    "name": "TPActivityDistance",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "TPActivityAverageHeartRate": {
                    "name": "TPActivityAverageHeartRate",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "TPActivityTSS": {
                    "name": "TPActivityTSS",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "TPActivityCalories": {
                    "name": "TPActivityCalories",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "TPActivityElevationGain": {
                    "name": "TPActivityElevationGain",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "TPActivityAverageSpeed": {
                    "name": "TPActivityAverageSpeed",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "TPActivityAverageCadence": {
                    "name": "TPActivityAverageCadence",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "TPActivityAverageTemp": {
                    "name": "TPActivityAverageTemp",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "ACTIVITIES360DSL": {
                    "name": "ACTIVITIES360DSL",
                    "isArray": false,
                    "type": {
                        "model": "ACTIVITIES360DSL"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "activitiestpActivities360DslId"
                    }
                },
                "TPActivityLocation": {
                    "name": "TPActivityLocation",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "TPActivity": {
                    "name": "TPActivity",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "ACTIVITIESTPS",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "ACTIVITIES360DSL": {
            "name": "ACTIVITIES360DSL",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "ActivityDescription": {
                    "name": "ActivityDescription",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "ActivityType": {
                    "name": "ActivityType",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "ActivityDate": {
                    "name": "ActivityDate",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "ActivityMovingTime": {
                    "name": "ActivityMovingTime",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "ActivityDistance": {
                    "name": "ActivityDistance",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "ACTIVITIES360DSLCUSTOMER360DSLS": {
                    "name": "ACTIVITIES360DSLCUSTOMER360DSLS",
                    "isArray": true,
                    "type": {
                        "model": "ACTIVITIES360DSLCUSTOMER360DSL"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "activities360dsl"
                    }
                },
                "ACTIVITIESSTRAVA": {
                    "name": "ACTIVITIESSTRAVA",
                    "isArray": false,
                    "type": {
                        "model": "ACTIVITIESSTRAVA"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "activities360DslActivitiesstravaId"
                    }
                },
                "ActivityAverageHeartRate": {
                    "name": "ActivityAverageHeartRate",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "ActivityStressScore": {
                    "name": "ActivityStressScore",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "ActivityCalories": {
                    "name": "ActivityCalories",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "ActivityElevationGain": {
                    "name": "ActivityElevationGain",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "ActivityAverageSpeed": {
                    "name": "ActivityAverageSpeed",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "ActivityAverageCadence": {
                    "name": "ActivityAverageCadence",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "ActivityAverageTemp": {
                    "name": "ActivityAverageTemp",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "ActivityLocation": {
                    "name": "ActivityLocation",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ActivityRPE": {
                    "name": "ActivityRPE",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "ActivityFatigueLevel": {
                    "name": "ActivityFatigueLevel",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ActivityPhysicalLevel": {
                    "name": "ActivityPhysicalLevel",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "ACTIVITIES360DSLS",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "ACTIVITIES360DSLCUSTOMER360DSL": {
            "name": "ACTIVITIES360DSLCUSTOMER360DSL",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "activities360dsl": {
                    "name": "activities360dsl",
                    "isArray": false,
                    "type": {
                        "model": "ACTIVITIES360DSL"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "activities360dslID"
                    }
                },
                "customer360dsl": {
                    "name": "customer360dsl",
                    "isArray": false,
                    "type": {
                        "model": "CUSTOMER360DSL"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "customer360dslID"
                    }
                }
            },
            "syncable": true,
            "pluralName": "ACTIVITIES360DSLCUSTOMER360DSLS",
            "attributes": [
                {
                    "type": "model",
                    "properties": {
                        "queries": null
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byACTIVITIES360DSL",
                        "fields": [
                            "activities360dslID",
                            "customer360dslID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byCUSTOMER360DSL",
                        "fields": [
                            "customer360dslID",
                            "activities360dslID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "CUSTOMER360DSL": {
            "name": "CUSTOMER360DSL",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "LastName": {
                    "name": "LastName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "FirstName": {
                    "name": "FirstName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "EmailAddress": {
                    "name": "EmailAddress",
                    "isArray": false,
                    "type": "AWSEmail",
                    "isRequired": true,
                    "attributes": []
                },
                "MobileNumber": {
                    "name": "MobileNumber",
                    "isArray": false,
                    "type": "AWSPhone",
                    "isRequired": true,
                    "attributes": []
                },
                "Gender": {
                    "name": "Gender",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "DateOfBirth": {
                    "name": "DateOfBirth",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": true,
                    "attributes": []
                },
                "Country": {
                    "name": "Country",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "activities360dsls": {
                    "name": "activities360dsls",
                    "isArray": true,
                    "type": {
                        "model": "ACTIVITIES360DSLCUSTOMER360DSL"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "customer360dsl"
                    }
                },
                "CUSTOMER3RDPARTIES": {
                    "name": "CUSTOMER3RDPARTIES",
                    "isArray": true,
                    "type": {
                        "model": "CUSTOMER3RDPARTY"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "customer360dslID"
                    }
                }
            },
            "syncable": true,
            "pluralName": "CUSTOMER360DSLS",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "customer360dslByEmail",
                        "fields": [
                            "EmailAddress"
                        ],
                        "queryField": "customer360dslByEmail"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "ACTIVITIESSTRAVA": {
            "name": "ACTIVITIESSTRAVA",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "StravaActivityId": {
                    "name": "StravaActivityId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "StravaActivityOwnerId": {
                    "name": "StravaActivityOwnerId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "StravaActivityDescription": {
                    "name": "StravaActivityDescription",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "StravaActivityType": {
                    "name": "StravaActivityType",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "StravaActivityDate": {
                    "name": "StravaActivityDate",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "StravaActivityMovingTime": {
                    "name": "StravaActivityMovingTime",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "StravaActivityDistance": {
                    "name": "StravaActivityDistance",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "StravaActivityAverageHeartRate": {
                    "name": "StravaActivityAverageHeartRate",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "StravaActivitySufferScore": {
                    "name": "StravaActivitySufferScore",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "StravaActivityCalories": {
                    "name": "StravaActivityCalories",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "StravaActivityElevationGain": {
                    "name": "StravaActivityElevationGain",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "StravaActivityAverageSpeed": {
                    "name": "StravaActivityAverageSpeed",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "StravaActivityAverageCadence": {
                    "name": "StravaActivityAverageCadence",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "StravaActivityAvergeTemp": {
                    "name": "StravaActivityAvergeTemp",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "StravaActivityLocation": {
                    "name": "StravaActivityLocation",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "StravaActivity": {
                    "name": "StravaActivity",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "ACTIVITIESSTRAVAS",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {},
    "nonModels": {},
    "version": "309bd29b2e3847967996fffe74a68c64"
};
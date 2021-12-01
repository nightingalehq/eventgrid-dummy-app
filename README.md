# eventgrid-dummy-app

This is dummy application attempting to illustrate an Azure Event Grid issue. Upon a successful post request we expect the console to log the submitted data as JSON. 

On line 26 of our Axios configuration we are including the required SAS key, and our post data complies with [Event Grid Schema](https://docs.microsoft.com/en-us/azure/event-grid/event-schema). 

We are getting 200s when making post requests using Postman.

Curl command from Postman:

```curl
curl --location --request POST 'https://egtester.uksouth-1.eventgrid.azure.net/api/events' --header 'Content-Type: application/json' --header 'aeg-sas-key: 3SErw+mCGtyvTWcVsa1lqd4iJiFW2IsUNmothj75J1A=' --data-raw '[
    {
        "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "eventType": "recordInserted",
        "subject": "eventgrid-tester/egtester",
        "eventTime": "2021-11-29T16:18:38.532Z",
        "data": {
            "preferredName": "Nikhil",
            "familyName": "Kanukuntla",
            "accepted": true,
            "message": "This is a message under 1000 characters.",
            "email": "nikhil.kanukuntla@nightingalehq.ai"
        },
        "dataVersion": "1.0",
        "metadataVersion": "1",
        "topic": "/subscriptions/ebad44a1-8089-425e-95b9-426d13f172cd/resourceGroups/temp-eventgrid-tester/providers/Microsoft.EventGrid/topics/egtester"
    }
]'

```

ARM for the Event Grid:

```json
{
    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "topics_egtester_name": {
            "defaultValue": "egtester",
            "type": "String"
        }
    },
    "variables": {},
    "resources": [
        {
            "type": "Microsoft.EventGrid/topics",
            "apiVersion": "2021-06-01-preview",
            "name": "[parameters('topics_egtester_name')]",
            "location": "uksouth",
            "sku": {
                "name": "Basic"
            },
            "kind": "Azure",
            "identity": {
                "type": "None"
            },
            "properties": {
                "inputSchema": "EventGridSchema",
                "publicNetworkAccess": "Enabled",
                "disableLocalAuth": false
            }
        }
    ]
}
```

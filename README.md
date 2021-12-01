# eventgrid-dummy-app

This is dummy application attempting to illustrate an Azure Event Grid issue. Upon a successful post request we expect the console to log the submitted data as JSON. 

On line 26 of our Axios configuration we are including the required SAS key, and our post data complies with [Event Grid Schema](https://docs.microsoft.com/en-us/azure/event-grid/event-schema). 

We are getting 200s successfully when making post requests using Postman.

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

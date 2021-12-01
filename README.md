# eventgrid-dummy-app

This is dummy application attempting to illustrate an Azure Event Grid issue. Upon a successful post request we expect the console to log the submitted data as JSON. 

On line 26 of our Axios configuration we are including the required SAS key, and our post data complies with [Event Grid Schema](https://docs.microsoft.com/en-us/azure/event-grid/event-schema). 

We are getting 200s successfully when making post requests using Postman.

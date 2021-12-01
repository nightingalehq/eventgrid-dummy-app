require("dotenv").config();
const eventGridKey = process.env.EVENTGRID_KEY;
const apiEndpoint = "https://egtester.uksouth-1.eventgrid.azure.net/api/events";


const eventGridApi = axios.create({
  baseURL: apiEndpoint,
});

function onSubmit() {
  let postData = {
    id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    eventType: "recordInserted",
    subject: "egtester/submission",
    eventTime: "2021-11-29T16:18:38.532Z",
    data: {
      preferredName: "Nikhil",
      familyName: "Kanukuntla",
      accepted: true,
      message: "Test Message",
      email: "nikhil.kanukuntla@nhq.com",
    },
    dataVersion: "1.0",
    metadataVersion: "1",
    topic:
      "/subscriptions/ebad44a1-8089-425e-95b9-426d13f172cd/resourceGroups/temp-eventgrid-tester/providers/Microsoft.EventGrid/topics/egtester",
  };

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "aeg-sas-key": eventGridKey,
      "Access-Control-Allow-Origin": "*",
    },
  };

  eventGridApi
    .post("/events", postData, axiosConfig)
    .then((result) => {
      console.log(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
    });
}

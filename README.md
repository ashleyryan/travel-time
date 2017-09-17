# travel-time

I'm considering moving, and I want to see how my commute will compare if I move to various locations. So I wrote some gulp tasks that will pull origins/destinations from google sheets, request the current travel time, and update a sheet with that data. Then it can be scheduled to run every morning and night.

So far it just reads the travel data and writes it to the console.

requires a `client_secret.json` file in the root directory as instructed here: 
  https://developers.google.com/sheets/api/quickstart/nodejs

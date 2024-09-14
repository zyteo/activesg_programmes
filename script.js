const fs = require("fs");
const venuesList = [];
const allSportsNames = [];
const masterList = [];
const sample = [];


getVenues()
  .then((data) => {
    // console.log(JSON.stringify(data.result.data.json));
    for (let i = 0; i < data.result.data.json.length; i++) {
      // console.log(data.result.data.json[i]);
      venuesList.push(data.result.data.json[i].name);
    }
  })
  .catch((error) => {
    console.log(error);
  });
getSports()
  .then((data) => {
    // console.log(JSON.stringify(data.result.data.json));
    for (let i = 0; i < data.result.data.json.length; i++) {
      // console.log(data.result.data.json[i]);
      allSportsNames.push(data.result.data.json[i].name);
    }
    getFilteredActivities();
  })
  .catch((error) => {
    console.log(error);
  });
const getFilteredActivities = () => {
  for (let i = 0; i < allSportsNames.length; i++) {
    // for (let i = 0; i < 1; i++) {
    getActivities(allSportsNames[i])
      .then((data) => {
        // console.log(JSON.stringify(data.result.data.json.programmes));
        for (let i = 0; i < data.result.data.json.programmes.length; i++) {
          // console.log(data.result.data.json.programmes[i]);

          // check if startdatetime is a weekend or not
          // if it is, push it to masterList
          if (
            new Date(
              data.result.data.json.programmes[i].sessions[0].startDateTime
            ).getDay() === 0 ||
            new Date(
              data.result.data.json.programmes[i].sessions[0].startDateTime
            ).getDay() === 6
          ) {
            masterList.push(data.result.data.json.programmes[i]);
          }
        }
        // console.log(masterList.length);
        if (masterList.length === 145) {
          for (let i = 0; i < masterList.length; i++) {
            sample.push({
              name: masterList[i].title,
              venue: masterList[i].venue.name,
              startDateTime: masterList[i].sessions[0].startDateTime,
              endDateTime:
                masterList[i].sessions[masterList[i].sessions.length - 1]
                  .endDateTime,
              maxCapacity: masterList[i].maxCapacity,
              participants: masterList[i].participantCount,
              intensity: masterList[i].intensityLevel,
            });
          }
          //write sample into a file with fs
          fs.writeFile("sample.json", JSON.stringify(sample), (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("File written successfully\n");
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

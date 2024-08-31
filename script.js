const venuesList = [];
const allSportsNames = [];
const masterList = [];
const venues =
  "https://activesg.gov.sg/api/trpc/programme.getProgrammeVenues?input=%7B%22json%22%3Anull%2C%22meta%22%3A%7B%22values%22%3A%5B%22undefined%22%5D%7D%7D";

const listOfSports =
  "https://activesg.gov.sg/api/trpc/activity.listForProgrammes?input=%7B%22json%22%3Anull%2C%22meta%22%3A%7B%22values%22%3A%5B%22undefined%22%5D%7D%7D";

const getVenues = async () => {
  const response = await fetch(venues);
  const data = await response.json();
  return data;
};
const getSports = async () => {
  const response = await fetch(listOfSports);
  const data = await response.json();
  return data;
};
const getActivities = async (sportName) => {
  // if sportName has space, replace all spaces with %20
  // if sportName has , replace all , with %2C
  // if sportName has & replace all & with %26
  sportName = sportName.replace(/ /g, "%20");
  sportName = sportName.replace(/,/g, "%2C");
  sportName = sportName.replace(/&/g, "%26");

  const response = await fetch(
    `https://activesg.gov.sg/api/trpc/programme.listV2?input=%7B%22json%22%3A%7B%22searchQuery%22%3A%22${sportName}%22%2C%22venueId%22%3Anull%2C%22minAgeFilter%22%3Anull%2C%22maxAgeFilter%22%3Anull%2C%22sexFilter%22%3Anull%2C%22postalCode%22%3Anull%2C%22firstSessionFromDate%22%3Anull%2C%22lastSessionTillDate%22%3Anull%2C%22limit%22%3A10%2C%22cursor%22%3Anull%7D%2C%22meta%22%3A%7B%22values%22%3A%7B%22cursor%22%3A%5B%22undefined%22%5D%7D%7D%7D`
  );
  const data = await response.json();
  return data;
};

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
  // for (let i = 0; i < allSportsNames.length; i++) {
  for (let i = 0; i < 1; i++) {
    getActivities(allSportsNames[i])
      .then((data) => {
        // console.log(JSON.stringify(data.result.data.json.programmes));
        for (let i = 0; i < data.result.data.json.programmes.length; i++) {
          console.log(data.result.data.json.programmes[i]);

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
        console.log(masterList);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

const venuesList = [];
const venues =
  "https://activesg.gov.sg/api/trpc/programme.getProgrammeVenues?input=%7B%22json%22%3Anull%2C%22meta%22%3A%7B%22values%22%3A%5B%22undefined%22%5D%7D%7D";

const listOfSports =
  "https://activesg.gov.sg/api/trpc/activity.listForProgrammes?input=%7B%22json%22%3Anull%2C%22meta%22%3A%7B%22values%22%3A%5B%22undefined%22%5D%7D%7D";

const getVenues = async () => {
  const response = await fetch(venues);
  const data = await response.json();
  return data;
};

getVenues()
  .then((data) => {
    // console.log(JSON.stringify(data.result.data.json));
    for (let i = 0; i < data.result.data.json.length; i++) {
      console.log(data.result.data.json[i]);
      // update venuesList array in venues.js and save file
      venuesList.push(data.result.data.json[i]);
    }
  })
  .catch((error) => {
    console.log(error);
  });

import React, { useEffect } from "react";
import axios from "axios";

function Loading({
  sportsList,
  userSelectedVenues,
  setResults,
  setScreen,
  loader,
}) {
  useEffect(() => {
    const promises = sportsList.map((sport) => {
      return axios
        .get(`https://asgfilter-be.vercel.app/api/activity?sport=${sport.name}`)
        .then((response) => {
          const filteredProgrammes =
            response.data.result.data.json.programmes.filter((programme) => {
              const sessionDate = new Date(programme.sessions[0].startDateTime);
              return (
                (sessionDate.getDay() === 0 || sessionDate.getDay() === 6) &&
                userSelectedVenues.includes(programme.venue.id)
              );
            });
          return filteredProgrammes;
        });
    });

    Promise.all(promises)
      .then((results) => {
        const allFilteredProgrammes = results.reduce(
          (acc, curr) => [...acc, ...curr],
          []
        );
        setResults(allFilteredProgrammes);

        setScreen("Results");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [loader]);

  return (
    <div className="loading">
      <div className="loader"></div>
      <p>Loading...</p>
    </div>
  );
}

export default Loading;

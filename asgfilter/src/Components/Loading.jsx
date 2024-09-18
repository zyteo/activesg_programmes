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
    for (let i = 0; i < sportsList.length; i++) {
      axios
        .get(
          `https://asgfilter-be.vercel.app/api/activity?sport=${sportsList[i].name}`
        )
        .then((response) => {
          for (
            let i = 0;
            i < response.data.result.data.json.programmes.length;
            i++
          ) {
            if (
              (new Date(
                response.data.result.data.json.programmes[
                  i
                ].sessions[0].startDateTime
              ).getDay() === 0 ||
                new Date(
                  response.data.result.data.json.programmes[
                    i
                  ].sessions[0].startDateTime
                ).getDay() === 6) &&
              userSelectedVenues.includes(
                response.data.result.data.json.programmes[i].venue.id
              )
            ) {
              // console.log(response.data.result.data.json);
              setResults((results) => [
                ...results,
                response.data.result.data.json.programmes[i],
              ]);
              
            }
          }
        });
        if (i === sportsList.length - 1) {
          setScreen("Results");
          console.log("results");
        }
      
    }
  }, [loader]);

  return (
    <div>
      <div className="loader"></div>
      <p>Loading...</p>
    </div>
  );
}

export default Loading;

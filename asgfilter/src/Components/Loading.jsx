import React from "react";
import axios from "axios";

function Loading({ sportsList, userSelectedVenues, setResults }) {
  for (let i = 0; i < sportsList.length; i++) {
    axios
      .get(
        `https://asgfilter-be.vercel.app/api/activity?sport=${sportsList[i].name}`
      )
      .then((response) => {
        console.log(response.data.result.data.json);
      });
  }

  return (
    <div>
      <div class="loader"></div>
      <p>Loading...</p>
    </div>
  );
}

export default Loading;

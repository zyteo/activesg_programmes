import { useState, useEffect } from "react";
import "./App.css";
import Attribution from "./Components/Attribution";
import axios from "axios";
import Home from "./Components/Home";
import Loading from "./Components/Loading";

function App() {
  const [venues, setVenues] = useState([]);
  const [userSelectedVenues, setUserSelectedVenues] = useState([]);
  const [sportsList, setSportsList] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get(`https://asgfilter-be.vercel.app/api/venues`).then((response) => {
      setVenues(response.data.result.data.json);
    });

    axios
      .get(`https://asgfilter-be.vercel.app/api/sportslist`)
      .then((response) => {
        setSportsList(response.data.result.data.json);
        console.log(response.data.result.data.json);
      });
  }, []);

  return (
    <>
      <Home
        venues={venues}
        setUserSelectedVenues={setUserSelectedVenues}
        userSelectedVenues={userSelectedVenues}
      />

      <Loading
        sportsList={sportsList}
        userSelectedVenues={userSelectedVenues}
        setResults={setResults}
      />
      <Attribution />
    </>
  );
}

export default App;

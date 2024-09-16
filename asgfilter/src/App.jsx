import { useState, useEffect } from "react";
import "./App.css";
import Attribution from "./Components/Attribution";
import axios from "axios";
import Home from "./Components/Home";
import Loading from "./Components/Loading";
import Results from "./Components/Results";

function App() {
  const [venues, setVenues] = useState([]);
  const [userSelectedVenues, setUserSelectedVenues] = useState([]);
  const [sportsList, setSportsList] = useState([]);
  const [results, setResults] = useState([]);
  const [screen, setScreen] = useState("Home");
  const [loader, setLoader] = useState(false);

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
      {screen === "Home" ? (
        <Home
          venues={venues}
          setUserSelectedVenues={setUserSelectedVenues}
          userSelectedVenues={userSelectedVenues}
          setScreen={setScreen}
          setLoader={setLoader}
          loader={loader}
        />
      ) : null}
      {screen === "Loading" ? (
        <Loading
          sportsList={sportsList}
          userSelectedVenues={userSelectedVenues}
          setResults={setResults}
          setScreen={setScreen}
          loader={loader}
        />
      ) : null}

      {screen === "Results" ? (
        <Results
          results={results}
          setResults={setResults}
          setScreen={setScreen}
        />
      ) : null}

      <Attribution />
    </>
  );
}

export default App;

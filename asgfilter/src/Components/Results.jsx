import Datetimeformat from "./Datetimeformat";

function Results({ results, setResults, setScreen }) {
  return (
    <div>
      <h1>Results</h1>
      {results.map((result) => (
        <div className="box" key={result.id}>
          <h5>{result.title}</h5>
          <p>{result.venue.name}</p>
          <p>{result.venue.address}</p>
          <p>{result.venue.intensityLevel}</p>

          <p>
            Participants: &nbsp; {result.participantCount}/{result.maxCapacity}
          </p>

          <p>Session(s)</p>
          {result.sessions.map((session) => (
            // console.log(session),
            <div>
              Start: &nbsp;
              <Datetimeformat
                dateTime={session.startDateTime}
                dateTimeFormat={"Pp"}
              />
              &nbsp; End:&nbsp;
              <Datetimeformat
                dateTime={session.endDateTime}
                dateTimeFormat={"Pp"}
              />
            </div>
          ))}
        </div>
      ))}

      {results.length === 0 ? <p>No results found.</p> : null}
      <button
        onClick={() => {
          setScreen("Home");
          setResults([]);
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default Results;

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
            Participants:&nbsp;{result.participantCount}/{result.maxCapacity}
          </p>
          {result.sessions.length === 1 ? (
            <p>Session:</p>
          ) : (
            <p>{result.sessions.length} Sessions:</p>
          )}

          {result.sessions.map((session) => (
            // console.log(session),
            <div>
              <p>
                <Datetimeformat
                  dateTime={session.startDateTime}
                  dateTimeFormat={"ccc"}
                />
                &nbsp;
                <Datetimeformat
                  dateTime={session.startDateTime}
                  dateTimeFormat={"P"}
                />
                &nbsp;
                <Datetimeformat
                  dateTime={session.startDateTime}
                  dateTimeFormat={"p"}
                />
                -
                <Datetimeformat
                  dateTime={session.endDateTime}
                  dateTimeFormat={"p"}
                />
              </p>
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

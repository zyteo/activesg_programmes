import React from "react";

function Home({
  venueLoader,
  venues,
  setUserSelectedVenues,
  userSelectedVenues,
  setScreen,
  setLoader,
  loader,
}) {
  return (
    <>
      <h1>Active SG Filter</h1>
      {venueLoader === true ? (
        <div className="loading">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      ) : null}
      <div>
        {venues.map((venue) => (
          <div className="venue" key={venue.id}>
            <p className="venue-text">{venue.name}</p>
            {userSelectedVenues.includes(venue.id) ? (
              <button
                onClick={() =>
                  setUserSelectedVenues(
                    userSelectedVenues.filter((id) => id !== venue.id)
                  )
                }
              >
                Remove
              </button>
            ) : (
              <button
                onClick={() =>
                  setUserSelectedVenues([...userSelectedVenues, venue.id])
                }
              >
                Add
              </button>
            )}
          </div>
        ))}
      </div>
      {userSelectedVenues.length > 0 ? (
        <button
          onClick={() => {
            setScreen("Loading");
            setLoader(!loader);
          }}
        >
          Find Activities
        </button>
      ) : null}

      <hr></hr>
    </>
  );
}

export default Home;

import React from "react";

function Home({
  venues,
  setUserSelectedVenues,
  userSelectedVenues,
  setScreen,
  setLoader,
  loader
}) {
  return (
    <>
      <h1>Active SG Filter</h1>
      <div>
        {venues.map((venue) => (
          <div key={venue.id}>
            <p>{venue.name}</p>
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
          Find
        </button>
      ) : null}

      <hr></hr>
    </>
  );
}

export default Home;

import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as spots from "../data/spots.json";

function Map() {
  const [viewport, setViewport] = useState({
    latitude: 59.91333,
    longitude: 10.73897,
    width: "100vw",
    height: "600px",
    zoom: 13
  });
  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/tirilfjell/ckkzmh10v83dz17nvim0lt7eb"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {spots.features.map(spot => (
          <Marker
            key={spot.properties.SPOT_ID}
            latitude={spot.geometry.coordinates[1]}
            longitude={spot.geometry.coordinates[0]}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedPark(spot);
              }}
            >
              <img className="heartimg" src="/heart.svg" alt="heart icon" />
            </button>
          </Marker>
        ))}

        {selectedPark ? (
          <Popup
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTION}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default Map;

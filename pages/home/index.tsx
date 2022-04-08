import * as React from "react";
import type { NextPage } from "next";
import Map from "react-map-gl";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibW9uZzAweCIsImEiOiJjbDFuZWNwbTAwMTl4M2txcDExMnZpeGdxIn0.b7ny8BC4Df1STWo_TB1o9w";

const Home: NextPage = () => {
  return (
    <div>
      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      />
    </div>
  );
};

export default Home;

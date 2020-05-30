import React from "react";
import { AirtableMap } from "./AirtableMap";

function App() {
  const layers = [
    {
      layerName: "Deliveries",
      tableName: "Coordinated delivery shifts",
      viewName: "Queens Together 5/30",
      idFieldName: "Unique ID",
      geocodedFieldName: "Geocode cache",
    },
    {
      layerName: "Drivers",
      tableName: "Volunteers",
      viewName: "Delivery Drivers Map",
      idFieldName: "Unique ID",
      geocodedFieldName: "Geocode cache",
      // clusterCount: 10,
    },
  ];

  return (
    <div>
      <AirtableMap layers={layers} />
    </div>
  );
}

export default App;

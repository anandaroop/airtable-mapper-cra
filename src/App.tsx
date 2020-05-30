import React from "react";
import { AirtableMap } from "./AirtableMap";

function App() {
  const layers = [
    {
      layerName: "Volunteers",
      tableName: "Volunteers",
      viewName: "Map",
      idFieldName: "Unique ID",
      geocodedFieldName: "Geocode cache",
    },
    {
      layerName: "Requests",
      tableName: "Requests",
      viewName: "Map",
      idFieldName: "Unique ID",
      geocodedFieldName: "Geocode cache",
    },
  ];

  return (
    <div>
      <AirtableMap layers={layers} />
    </div>
  );
}

export default App;

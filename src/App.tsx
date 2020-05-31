import React from "react";
import { AirtableMap, AirtableMapLayer } from "./AirtableMap";

function App() {
  return (
    <div>
      <AirtableMap>
        <AirtableMapLayer
          name="Requests"
          color="hsl(36, 96%, 48%)"
          radius={10}
          airtable={{
            tableName: "Requests",
            viewName: "Map",
            idFieldName: "Unique ID",
            geocodedFieldName: "Geocode cache",
          }}
        />

        <AirtableMapLayer
          name="Volunteers"
          color="hsl(200, 89%, 46%)"
          radius={8}
          airtable={{
            tableName: "Volunteers",
            viewName: "Map",
            idFieldName: "Unique ID",
            geocodedFieldName: "Geocode cache",
          }}
        />

        {/* <AirtableMapLayer
          name="Deliveries"
          color="orange"
          airtable={{
            tableName: "Coordinated delivery shifts",
            viewName: "Queens Together 5/30",
            idFieldName: "Unique ID",
            geocodedFieldName: "Geocode cache",
            clusterCount: 10,
          }}
        />

        <AirtableMapLayer
          name="Drivers"
          color="black"
          airtable={{
            tableName: "Volunteers",
            viewName: "Delivery Drivers Map",
            idFieldName: "Unique ID",
            geocodedFieldName: "Geocode cache",
          }}
        /> */}
      </AirtableMap>
    </div>
  );
}

export default App;

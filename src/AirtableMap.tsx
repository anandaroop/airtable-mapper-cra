import React from "react";
import { FeatureCollection } from "geojson";

interface GeojsonLayer {
  /** Name of the table within the Airtable base */
  tableName: string;

  /** Name of the view within the Airtable base (default: "Grid view") */
  viewName: string;

  /** Name of a column holding a (non-PII) unique identifier to include in the GeoJSON */
  idFieldName: string;

  /** Name of a column holding the Airtable Map block's cached geocoding result  */
  geocodedFieldName: string;

  /** (Optional) How many clusters to create from the retrieved locations */
  clusterCount?: number;
}

export interface Props {
  layers: GeojsonLayer[];
}

interface State {
  isLoading: boolean;
  layers: FeatureCollection[];
}

export class AirtableMap extends React.Component<Props, State> {
  state = {
    isLoading: true,
    layers: [],
  };

  constructor(props: Props) {
    super(props);
  }

  async componentDidMount() {
    const url =
      "https://us-central1-airtable2geojson.cloudfunctions.net/qdsama-hub";

    const fetches = this.props.layers.map((layer) => {
      const body = { ...layer };
      const options: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };
      return fetch(url, options);
    });

    Promise.all(fetches).then((responses) => {
      Promise.all(responses.map((r) => r.json())).then((featureCollections) => {
        this.setState({
          isLoading: false,
          layers: featureCollections,
        });
      });
    });
  }

  render() {
    return <div>{this.state.isLoading ? "loading…" : <div>Map!</div>}</div>;
  }
}

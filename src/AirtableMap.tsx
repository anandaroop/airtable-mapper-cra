import React, { ReactElement } from "react";
import { FeatureCollection } from "geojson";
import { Map as LeafletMap, TileLayer, GeoJSON } from "react-leaflet";
import { CircleMarker } from "leaflet";

interface AirtableMapProps {
  children: AirtableMapLayer[];
}

export class AirtableMap extends React.Component<AirtableMapProps> {
  state = {
    isLoading: true,
    layers: [],
  };

  render() {
    const position = [40.7028, -73.8357] as any;
    return (
      <LeafletMap center={position} zoom={12}>
        <TileLayer
          attribution=' &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {this.props.children}
      </LeafletMap>
    );
  }
}

interface AirtableMapLayerProps {
  /** Display name for layer */
  name: string;

  /** Color for this layer's markers. (May be overriden by a `marker-color` property of the Feature) */
  color?: string;

  /** Radius of circle marker. */
  radius?: number;

  /** Airtable GeoJSON query details */
  airtable?: AirtableGeoJSONSpec;
}

interface AirtableMapLayerState {
  isLoading: boolean;
  data: FeatureCollection | null;
}

interface AirtableGeoJSONSpec {
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

export class AirtableMapLayer extends React.Component<
  AirtableMapLayerProps,
  AirtableMapLayerState
> {
  state = {
    isLoading: false,
    data: null,
  };

  async componentDidMount() {
    const url =
      "https://us-central1-airtable2geojson.cloudfunctions.net/qdsama-hub";

    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.props.airtable),
    };

    const response = await fetch(url, options);
    const json = await response.json();

    this.setState({ data: json });
  }

  render() {
    if (this.state.data === null) {
      return null;
    }

    return (
      <GeoJSON
        data={this.state.data!}
        pointToLayer={(point, latLng) => {
          return new CircleMarker(latLng, {
            radius: this.props.radius || 10,
            weight: 0.5,
            color: point.properties["marker-color"] || this.props.color || "blue",
            fillOpacity: 0.4,
          }).bindPopup(
            `${this.props.airtable?.tableName} ID: ${point.properties.id}`
          );
        }}
      />
    );
  }
}

/**
 *  State module file
**/
import { BASEMAP, API_VERSIONS } from '@deck.gl/carto'

export const initialViewState = () => ({
  longitude: -97.2,
  latitude: 44.33,
  zoom: 3,
})

export const state = {
  credentials: {
    apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
    apiVersion: API_VERSIONS.V3,
    accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfbHFlM3p3Z3UiLCJqdGkiOiI1YjI0OWE2ZCJ9.Y7zB30NJFzq5fPv8W5nkoH5lPXFWQP0uywDtqUg8y8c'
  },
  basemap: BASEMAP.VOYAGER,

  // Mapbox
  mapboxStyle: 'mapbox://styles/botivegh11/cliq14gia003e01o13fnyhgl9',
  mapboxApiKey: 'pk.eyJ1IjoiYm90aXZlZ2gxMSIsImEiOiJjazdydGI1NXAwYTJ4M25zZnNuanhoOGVtIn0.ehZ8tfymMjbNyAPJ2o2lhQ',

  mapLoaded: false,
  viewState: initialViewState(),
  viewportFeatures: []
}

<template>
  <div class="home-container">
    <ViewTemplate></ViewTemplate>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import { MODULE_NAME, MUTATIONS } from "@/store/map";
import { GeoJsonLayer } from "@deck.gl/layers";
import {
  // CartoLayer,
  MAP_TYPES,
  FORMATS,
  getData,
  setDefaultCredentials,
  colorCategories,
  // colorContinuous,
} from "@deck.gl/carto";
import ViewTemplate from "@/components/view-template/ViewTemplate.vue";
import layerManager from "@/components/map-component/map-utils/layerManager";
import { viewportFeaturesFunctions } from "@/utils/viewportFeatures";

export default {
  name: "map-view",
  components: {
    ViewTemplate,
  },
  data: () => ({
    storesData: [],
  }),
  async mounted() {
    setDefaultCredentials(this.credentials);

    const geojsonData = await getData({
      type: MAP_TYPES.TABLE,
      source: `cartobq.public_account.retail_stores`,
      connection: "bqconn",
      format: FORMATS.GEOJSON,
    });
    this.storesData = geojsonData.features;
    layerManager.addLayer(
      new GeoJsonLayer({
        id: "stores",
        data: geojsonData.features,
        pointRadiusUnits: "pixels",
        lineWidthUnits: "pixels",
        pickable: true,
        getPointRadius: 3,
        autoHighlight: true,
        highlightColor: [0, 255, 0],
        getFillColor: colorCategories({
          attr: "storetype",
          domain: [
            "Supermarket",
            "Discount Store",
            "Hypermarket",
            "Drugstore",
            "Department Store",
          ],
          colors: "Pastel",
        }),
      })
    );

    layerManager.addLayer(
      new GeoJsonLayer({
        id: "uk-points",
        data:
          "https://api.myjson.online/v1/records/adfdc512-9270-451d-b4c2-54f3c5296c7a",
        dataTransform(d) {
          return d.data;
        },
        pointType: "circle",
        pointRadiusUnits: "pixels",
        stroked: true,
        getLineWidth: 3,
        lineWidthMinPixels: 2,
        visible: true,
        getPointRadius: 10,
        getFillColor: [240, 142, 240],
      })
    );

    layerManager.addLayer(
      new GeoJsonLayer({
        id: "uk-lsoa",
        data:
          "https://uk-move-map.s3.eu-west-1.amazonaws.com/data/LSOA.geojson",
        autoHighlight: true,
        pickable: true,
        pointRadiusUnits: "pixels",
        stroked: true,
        getLineWidth: 1,
        lineWidthMinPixels: 1,
        visible: true,
        getPointRadius: 10,
        getFillColor: [240, 142, 240, 100],
        highlightColor: [250,0,0]
      })
    );

    this[MUTATIONS.SET_MAP_LOADED](true);
  },
  methods: {
    ...mapMutations(MODULE_NAME, [
      MUTATIONS.SET_VIEWPORT_FEATURES,
      MUTATIONS.SET_MAP_LOADED,
    ]),
  },
  computed: {
    ...mapState(MODULE_NAME, ["viewState", "credentials"]),
  },
  watch: {
    viewState(v) {
      const viewportFeatures = viewportFeaturesFunctions.compute(
        v,
        this.storesData
      );
      this[MUTATIONS.SET_VIEWPORT_FEATURES](viewportFeatures);
    },
    storesData(d) {
      this[MUTATIONS.SET_VIEWPORT_FEATURES](d);
    },
  },
};
</script>
<style lang="scss" scoped>
html,
body {
  height: 100%;
  width: 100%;
  overflow: hidden;
  font-family: "Open Sans", sans-serif;
}

body {
  margin: 0;
}

.home-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.mapboxgl-control-container {
  display: none;
}
</style>

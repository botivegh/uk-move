/** * MapComponent.vue **/ /* template import */
<template>
  <div class="map-component-container">
    <div id="map"></div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import { MODULE_NAME, MUTATIONS } from "@/store/map";
import "mapbox-gl/dist/mapbox-gl.css";
import layerManager from "./map-utils/layerManager";

export default {
  name: "MapComponent",
  mounted() {
    this.layerManager = layerManager; // for debugging purposes
    this.setupDeck();
  },
  beforeDestroy() {
    this[MUTATIONS.RESET_VIEWSTATE]();
    layerManager.destroy();
  },
  computed: {
    ...mapState(MODULE_NAME, ["viewState", "basemap", "mapboxStyle", "mapboxApiKey"]),
  },
  methods: {
    ...mapMutations(MODULE_NAME, [
      MUTATIONS.SET_VIEWSTATE,
      MUTATIONS.RESET_VIEWSTATE,
      MUTATIONS.SET_MAP_LOADED,
    ]),
    setupDeck() {
      if (layerManager.deckInstance) {
        return;
      }
      layerManager.init({
        container: "#map",
        mapStyle: this.mapboxStyle,
        viewState: this.viewState,
        accessToken: this.mapboxApiKey,
        onViewStateChange: ({ viewState }) => {
          this[MUTATIONS.SET_VIEWSTATE](viewState);
        },
        onLoad: () => {
          this[MUTATIONS.SET_MAP_LOADED](true);
        },
      });
    },
  },
};
</script>
<style lang="scss" >
.map-component-container {
  position: relative;
  width: 100%;
  height: 100%;

  #map {
    height: 100%;
    top: 0;
    left: 0;
  }

  .map-controls {
    position: absolute;
    bottom: 20px;
    left: 20px;
    border-radius: 4px;
    box-shadow: 0 1px 4px 0 rgba(26, 30, 41, 0.2);
    background-color: #fff;

    button {
      padding: 2px;

      &:first-child {
        padding-right: 16px;
      }

      &:last-child {
        padding-left: 16px;
      }

      &:hover {
        background-color: darken(#fff, 5%);
      }
    }
  }
}
</style>

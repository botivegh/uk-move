<template>
  <div class="switch-container">
    <h3 class="title">Layers</h3>
    <div v-if="mapLoaded_ && layersData.lenght > 0">
      <md-switch
        class="md-primary"
        v-for="l of layersData"
        :key="l.id"
        v-model="l.isVisible"
        @change="handleChange(l.id)"
      >
        {{ l.label }}
      </md-switch>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { MODULE_NAME } from "@/store/map";
import layerManager from "../map-component/map-utils/layerManager";

export default {
  name: "LayerSelector",
  components: {},
  data: () => ({
    mapLoaded_: false,
    layersData: [],
  }),
  methods: {
    handleChange(layerId) {
      const isVisible = layerManager.isVisible(layerId);
      layerManager[isVisible ? "hideLayer" : "showLayer"](layerId);
    },
  },
  computed: {
    ...mapState(MODULE_NAME, ["mapLoaded"]),
  },
  watch: {
    mapLoaded(isLoaded) {
      const layers = Object.entries(layerManager.getLayers());
      this.layersData = layers.map(([id, layer]) => ({
        id,
        isVisible: "visible" in layer.props ? layer.props.visible : true,
        label: id || "",
      }));
      this.mapLoaded_ = isLoaded;
    },
  },
};
</script>
<style lang="scss" scoped>
.switch-container {
  display: flex;
  flex-direction: column;
  top: 5rem;
  right: 2rem;
  padding: 0.5rem 1rem 1rem 1.25rem;

  .md-switch.md-theme-default.md-checked.md-primary .md-switch-container {
    background-color: #036fe2;
  }

  .md-switch.md-theme-default.md-checked.md-primary .md-switch-thumb {
    background-color: #fff;
  }

  .md-switch.md-checked .md-switch-thumb {
    transform: translate3d(15px, 0, 0);
  }

  .md-switch.md-theme-default .md-switch-container {
    background-color: #fff;
    border: 2px solid grey;
  }

  .md-switch.md-theme-default.md-checked .md-switch-container {
    border: none;
  }

  .md-switch.md-theme-default .md-switch-thumb {
    background-color: grey;
  }

  .md-switch {
    margin: 0.5rem 1rem 0.5rem 0;
    text-transform: capitalize;
    align-items: center;

    label {
      padding-left: 0.75rem;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .md-switch-container {
      height: 23px;
      width: 36px;
      min-width: 36px;
      transition: none;
    }

    .md-switch-thumb {
      width: 11px;
      height: 11px;
      left: 4px;
    }
  }

  .title {
    font-family: Montserrat, "Open Sans", sans-serif;
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }
}
</style>

<template>
  <!-- HomeSidebar template file -->
  <div class="sidebar-container">
    <LayerSelector></LayerSelector>
    <BarChart></BarChart>
  </div>
</template>
<script>
import LayerSelector from "../layer-selector/LayerSelector.vue";
import BarChart from "../bar-chart/BarChart.vue";

export default {
  name: "HomeSidebar",
  components: {
    LayerSelector,
    BarChart,
  },
};
</script>
<style lang="scss" scoped>

.sidebar-container {
  height: 100%;
  width: 100%;
  background-color: #fff;
}
</style>

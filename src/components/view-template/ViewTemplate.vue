/** * ViewTemplate.vue **/ /* template import */
<template>
  <!-- ViewTemplate template file -->
  <div class="template-container">
    <div class="md-layout header">
      <div class="md-layout-item">
        <AppHeader></AppHeader>
      </div>
    </div>

    <div class="md-layout content">
      <div class="md-layout-item">
        <HomeSidebar></HomeSidebar>
      </div>
      <div class="md-layout-item">
        <MapComponent></MapComponent>
      </div>
    </div>
  </div>
</template>
<script>
import AppHeader from "../app-header/AppHeader.vue";
import HomeSidebar from "../home-sidebar/HomeSidebar.vue";
import MapComponent from "../map-component/MapComponent.vue";

export default {
  name: "ViewTemplate",
  components: {
    AppHeader,
    HomeSidebar,
    MapComponent,
  },
};
</script>
<style lang="scss" >

.template-container {
  height: 100%;
  width: 100%;
  background-color: lightgrey;
}

.header {
  height: 3rem;
}

.content {
  height: calc(100% - 3rem);

  .md-layout-item:first-child {
    width: 22rem;
    min-width: 22rem;
    max-width: 22rem;
  }
}
</style>

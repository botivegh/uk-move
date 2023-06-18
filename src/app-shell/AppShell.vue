<template>
  <div class="app-shell">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "AppShell",
  computed: {
    routes() {
      return [
        {
          to: { name: "home" },
          name: "Home",
        },
      ];
    },
  },
};
</script>
<style>
.app-shell {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>

<template>
  <div class="header-container">
    <div class="title">
      <img src="@/assets/img/carto-logo.svg" />
      <h3>Vue</h3>
      <h3>Demo</h3>
    </div>
  </div>
</template>
<script>
export default {
  name: "AppHeader",
};
</script>
<style lang="scss">
.header-container {
  height: 100%;
  width: 100%;
  display: flex;
  background-color: #036fe2;
  padding: 0 1.5rem;

  .title {
    display: flex;
    align-items: center;
  }

  h3 {
    margin: 0 0.15rem;
    color: #fff;

    &:last-child {
      font-weight: 300;
    }
  }

  img {
    height: 1.5rem;
    margin-right: 1rem;
  }
}
</style>

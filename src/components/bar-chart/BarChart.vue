/** * BarChart.vue **/ /* template import */
<template>
  <div class="bar-chart-container">
    <v-chart :option="bar" :loading="isLoading" autoresize />
    <v-btn>TEST VUETIFYT</v-btn>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { MODULE_NAME } from "@/store/map";
import ECharts from "vue-echarts";
import * as echarts from "echarts";
import { CanvasRenderer } from "echarts/renderers";
import { groupValuesByColumn } from "./chart-utils/histogram";

const { use } = echarts;

use([CanvasRenderer]);

export default {
  components: {
    "v-chart": ECharts,
  },
  data: () => ({
    bar: {
      grid: {
        left: 55,
        right: 55,
      },
      title: {
        text: "Revenue by store type",
        textStyle: {
          fontFamily: 'Montserrat, "Open Sans", sans-serif',
          fontSize: "1.125rem",
        },
      },
      xAxis: {
        type: "category",
        data: [],
        axisLabel: {
          show: true,
          rotate: 40,
          fontSize: 11,
          fontFamily: 'Montserrat, "Open Sans", sans-serif',
          formatter: (v) => v.replace(/ Store/g, ""),
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          fontSize: 11,
          fontFamily: 'Montserrat, "Open Sans", sans-serif',
          formatter: (v) => (v >= 1e6 ? `${v / 1e6}M` : v),
        },
      },
      series: {
        type: "bar",
        data: [],
        color: "#47db99",
      },
      tooltip: {
        trigger: "item",
        textStyle: {
          fontSize: 15,
        },
        formatter: ({ value }) =>
          value >= 1e6 ? `${(value / 1e6).toFixed(0)}M` : value,
      },
    },
    isLoading: true,
  }),
  computed: {
    ...mapState(MODULE_NAME, ["viewportFeatures"]),
  },
  watch: {
    viewportFeatures(data) {
      const groupedValues = groupValuesByColumn(data, "revenue", "storetype");
      const { xAxis, series } = this.bar;
      xAxis.data = groupedValues.map((d) => d.category);
      series.data = groupedValues.map((d) => d.value);
      this.isLoading = false;
    },
  },
};
</script>
<style lang="scss">
.bar-chart-container {
  width: 100%;
  height: 350px;
  margin: 1rem;
}

.echarts {
  width: 100%;
  height: 100%;
}
</style>

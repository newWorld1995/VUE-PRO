<template>
  <!--创建Ecahrts容器-->
  <div class="echarts-container">
    <div id="main"></div>
  </div>
</template>

<script>
// https://echarts.apache.org/handbook/zh/get-started/
import { defineComponent } from 'vue'
import * as echarts from 'echarts'
export default defineComponent({
  mounted() {
    this.drawEcharts()
  },
  methods: {
    drawEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: 'ECharts图表展示'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'line',
            data: [15, 20, 36, 10, 10, 20]
          },
          {
            name: '价格',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.echarts-container {
  position: relative;
  top: 320px;
  #main {
    width: 1000px;
    height: 600px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

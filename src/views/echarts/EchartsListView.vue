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
import { simpleData } from '@/api/echarts'
export default defineComponent({
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      simpleData().then((res) => {
        this.drawEcharts(res.data)
      })
    },
    drawEcharts(arr) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: 'ECharts图表展示'
        },
        tooltip: {},
        xAxis: {
          data: arr.map((item) => item.x) // arr=[{x:'星期一',val:xx},{x:'星期二',val}]
        },
        yAxis: {},
        legend: {
          // 图例
          data: ['销量', '价格', '饼图']
        },
        //工具箱
        toolbox: {
          show: true,
          feature: {
            // mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
            magicType: {
              type: ['line', 'bar']
            }
          }
        },
        series: [
          {
            name: '销量',
            type: 'line',
            data: arr.map((item) => item.val)
          },
          {
            name: '价格',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20, 40]
          },
          {
            name: '饼图',
            type: 'pie',
            radius: [50, 250],
            center: [800, 300],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: arr.map((item, index) => {
              return {
                value: item.val,
                name: 'rose ' + (index + 1)
              }
            })
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

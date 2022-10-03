<template>
  <!--创建地图容器-->
  <button @click="searchBus">查询320</button>
  <div id="container" class="allmap"></div>
  <div id="r-result"></div>
</template>

<script>
// 在vue项目中使用百度地图
// https://blog.csdn.net/u011295864/article/details/114695549
import { defineComponent } from 'vue'

import { BMPGL } from '@/bmpgl.js'
export default defineComponent({
  data() {
    return {
      ak: 'a3grcyZGzjAb6Thv4Hb6X6GVCVvkcGdC', // 百度的地图密钥
      mapInfo: {
        busSearch: ''
      }
    }
  },
  mounted() {
    this.initMap((busSearch) => {
      this.mapInfo.busSearch = busSearch
    })
  },
  methods: {
    searchBus() {
      this.mapInfo.busSearch()
    },
    initMap(callback) {
      // 传入密钥获取地图回调。
      BMPGL(this.ak).then((BMapGL) => {
        // 创建地图实例
        let map = new BMapGL.Map('container')
        // 创建点坐标 axios => res 获取的初始化定位坐标
        let point = new BMapGL.Point(120.374731, 36.087609)
        // 初始化地图，设置中心点坐标和地图级别
        map.centerAndZoom(point, 13)
        //开启鼠标滚轮缩放
        map.enableScrollWheelZoom(true)
        map.setHeading(64.5)
        map.setTilt(73)

        var marker = new BMapGL.Marker(point) // 创建标注
        map.addOverlay(marker) // 将标注添加到地图中
        var opts = {
          width: 200, // 信息窗口宽度
          height: 100, // 信息窗口高度
          title: '市北区', // 信息窗口标题
          message: '这里是青岛'
        }
        var infoWindow = new BMapGL.InfoWindow('地址：青岛市市北区xxx', opts) // 创建信息窗口对象
        marker.addEventListener('click', function () {
          map.openInfoWindow(infoWindow, point) //开启信息窗口
        })

        // 看公交
        var busline = new BMapGL.BusLineSearch(map, {
          renderOptions: { map: map, panel: 'r-result' },
          onGetBusListComplete: function (result) {
            if (result) {
              var fstLine = result.getBusListItem(0) //获取第一个公交列表显示到map上
              busline.getBusLine(fstLine)
            }
          }
        })
        function busSearch() {
          var busName = 320
          busline.getBusList(busName)
        }

        callback && callback(busSearch)
        // setTimeout(function () {
        //   busSearch()
        // }, 1500)
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.allmap {
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 1;
}
#r-result {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 99;
  width: 250px;
  height: 450px;
  overflow-y: auto;
  background: #fff;
  box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
  border-radius: 7px;
}
</style>

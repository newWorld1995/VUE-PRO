<template>
  <!-- <div @click="increment">count --- {{count}}</div> -->
  <!-- 将匹配的对应的视图页面渲染在此处 -->
  <router-view></router-view>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapMutations } from 'vuex'
export default defineComponent({
  computed: {
    ...mapState(['count'])
  },
  methods: {
    ...mapMutations(['increment'])
  }
})
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}
</style>

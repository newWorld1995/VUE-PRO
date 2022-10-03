<template>
  <div class="production-container">
    <el-table
      :data="computedTableData"
      stripe
      style="width: 100%"
      :header-cell-style="headerCellStyle"
      :cell-style="{ textAlign: 'center' }"
      max-height="750"
    >
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column label="图片">
        <template #default="scope"
          ><el-image
            preview-teleported
            :preview-src-list="[
              scope.row.img1,
              scope.row.img2,
              scope.row.img3,
              scope.row.img4
            ]"
            :src="scope.row.img1"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="proname" label="产品名字"></el-table-column>
      <el-table-column prop="brand" label="品牌"></el-table-column>
      <el-table-column
        prop="category"
        label="分类"
        :filters="filters"
        :filter-method="filterHandler"
      ></el-table-column>
      <el-table-column
        prop="originprice"
        label="原价"
        sortable
      ></el-table-column>
      <el-table-column prop="discount" label="折扣" sortable></el-table-column>
      <el-table-column prop="sales" label="销量" sortable></el-table-column>

      <el-table-column prop="isrecommend" label="是否推荐"
        ><template #default="scope"
          ><el-switch
            v-model="scope.row.isrecommend"
            :active-value="1"
            :inactive-value="0"
            @change="
              handleChange(
                scope.row.proid,
                'isrecommend',
                scope.row.isrecommend
              )
            "
          /> </template
      ></el-table-column>

      <el-table-column label="操作">
        <!-- 删除按钮的起泡模板 -->
        <template #default="scope">
          <el-popconfirm
            title="确定要删除吗?"
            @confirm="handleDelete(scope.row.proid)"
          >
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 此处是分页器 -->
    <el-pagination
      background
      layout="total,sizes,prev, pager, next,jumper"
      :total="tableData.length"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20, 30, 40]"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { showdata, updateProFlag } from '@/api/production.js'
export default defineComponent({
  data() {
    return {
      disabled: false, // 不禁用
      total: 0, // 产品列表的总的数量
      tableData: [],
      currentPage: 1, // 代表默认第一页
      pageSize: 10, // 代表每页10条
      headerCellStyle: {
        color: 'rgba(0,0,0,0.85)',
        fontWeight: '700',
        fontSize: '14px',
        textAlign: 'center',
        background: '#f8f8f8',
        height: '60px',
        borderRight: '1px solid #f0f0f0',
        transition: 'background .3s ease'
      }
    }
  },
  computed: {
    computedTableData() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        (this.currentPage - 1) * this.pageSize + this.pageSize
      )
    },
    filters() {
      // 每次切换页面的时候, 依赖项tableData发生改变了, 才会重新计算!!!
      let arr = this.tableData.map((item) => item.category)
      arr = [...new Set(arr)]
      return arr.map((item) => {
        // [{text:手机,value:手机},{text:家电,value:家电}]
        return { text: item, value: item }
      })
    }
  },
  methods: {
    filterHandler(value, row, column) {
      const property = column['property']

      return row[property] === value
    },
    handleChange(proid, type, flag) {
      this.disabled = true // 禁用了switch
      console.log(proid, type, !!flag)
      updateProFlag({ proid, type, flag: !!flag }).then(() => {
        this.disabled = false
        this.getProListData()
      })
    },

    getProListData() {
      showdata({
        type: 'isrecommend', // 获取推荐
        flag: 1 // 需要推荐的产品
      }).then((res) => {
        this.tableData = res.data
      })
    },
    handleDelete(proid) {
      console.log('proid------->', proid)
    }
  },
  created() {
    this.getProListData()
  }
})
</script>

<style lang="scss" scoped>
.production-container {
  height: 100%;
  background-color: white;
  padding: 24px;
}
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}
</style>

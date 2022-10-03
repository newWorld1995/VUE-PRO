<template>
  <div class="bannerlist-container">
    <div class="header">
      <el-button @click="addBannerBtn" type="primary">
        添加轮播图 <el-icon class="el-icon--right"><Plus /></el-icon>
      </el-button>
    </div>
    <el-table
      :data="computedTableData"
      stripe
      style="width: 100%"
      :header-cell-style="headerCellStyle"
      :cell-style="{ textAlign: 'center' }"
      max-height="600"
    >
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="img" label="图片">
        <template #default="scope"
          ><el-image :src="scope.row.img"> </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="link" label="链接" />
      <el-table-column prop="alt" label="提示" />
      <el-table-column label="操作">
        <!-- 删除按钮的起泡模板 -->
        <template #default="scope">
          <el-popconfirm
            title="确定要删除吗?"
            @confirm="handleDelete(scope.row.bannerid)"
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
      layout="total,prev, pager, next"
      :total="tableData.length"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getBannerList, deleteBannerById } from '@/api/banner'
import { Plus } from '@element-plus/icons-vue'
export default defineComponent({
  components: {
    Plus
  },
  data() {
    return {
      currentPage: 1, //当前的页码
      pageSize: 6, //每一页的条数
      tableData: [],
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
    }
  },
  methods: {
    addBannerBtn() {
      this.$router.push('/banner/banneradd')
    },
    handleDelete(bannerid) {
      deleteBannerById({ bannerid }).then(() => {
        // console.log(1)
        this.getBannerListData()
      })
    },

    getBannerListData() {
      getBannerList().then((res) => {
        console.log(res.data)
        this.tableData = res.data || []
      })
    }
  },
  created() {
    this.getBannerListData()
  }
})
</script>

<style lang="scss" scoped>
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}
.bannerlist-container {
  height: 100%;
  padding: 24px;
  background-color: #fff;
}
</style>

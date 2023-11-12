<template>
  <el-card class="box-card">
    <!-- 添加按钮 -->
    <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
    <!-- 表格组件 -->
    <el-table style="margin: 10px 0px" :data="trademarkArr" border>
      <el-table-column
        label="序号"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column label="品牌名称" prop="tmName">
        <!-- element pluse 插槽 -->
        <template #="{ row, $index }">
          <pre style="color: aqua">{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌Logo">
        <template #="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            title="Edit"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="Delete"
            title="Delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="changePageNo"
      @current-change="getHasTrademark"
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout="prev, pager, next, jumper,->, sizes,total"
      :total="total"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark'
import type {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/trademark/type'

// 当前页码
let pageNo = ref<number>(1)
// 每页展示条数
let limit = ref<number>(3)
// 存储已有品牌数据总数
let total = ref<number>(0)
// 存储已有的品牌数据
let trademarkArr = ref<Records>([])
// 获取品牌接口，封装成函数
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  if (result.code === 200) {
    //获取总个数
    total.value = result.data.total
    trademarkArr.value = result.data.records
    // 添加协议前缀到logoUrl
    trademarkArr.value.forEach((trademark: TradeMark) => {
      trademark.logoUrl = addProtocolPrefix(trademark.logoUrl)
    })
  }
}
// 辅助函数：添加协议前缀
const addProtocolPrefix = (url: any) => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'http://' + url
  }
  return url
}
// 分页器发生变化时触发
const changePageNo = () => {
  getHasTrademark()
}

// 组件挂载完毕钩子
onMounted(() => {
  getHasTrademark()
})
</script>

<style scoped></style>

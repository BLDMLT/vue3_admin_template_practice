<template>
  <div>
    <el-card class="box-card">
      <!-- 添加按钮 -->
      <el-button type="primary" size="default" icon="Plus" @click="addTrademark">
        添加品牌
      </el-button>
      <!-- 表格组件 -->
      <el-table style="margin: 10px 0px" :data="trademarkArr" border>
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
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
            <el-button type="primary" size="small" icon="Edit" title="Edit" @click="updateTrademark"></el-button>
            <el-button type="primary" size="small" icon="Delete" title="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="changePageNo" @current-change="getHasTrademark" v-model:current-page="pageNo"
        v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
        layout="prev, pager, next, jumper,->, sizes,total" :total="total" />
    </el-card>
    <!-- 对话框组件：用于添加和修改已有品牌 -->
    <el-dialog v-model="dialogFormVisible" title="添加品牌">
      <el-form style="width: 80%">
        <el-form-item label="品牌名称" label-width="80px">
          <el-input placeholder="请您输入品牌名称" autocomplete="off" v-model="trademarkParams.tmName" />
        </el-form-item>
        <el-form-item label="品牌Logo" label-width="80px">
          <!-- action 为url，要带api -->
          <!-- before-upload 约束上传条件(类型/大小) -->
          <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { reqHasTrademark } from '@/api/product/trademark'
import type { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type'
import type { UploadProps } from 'element-plus'
// 当前页码
let pageNo = ref<number>(1)
// 每页展示条数
let limit = ref<number>(3)
// 存储已有品牌数据总数
let total = ref<number>(0)
// 存储已有的品牌数据
let trademarkArr = ref<Records>([])
// 控制对话框显示和隐藏
let dialogFormVisible = ref<boolean>(false)
// 定义收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: ''
})
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
// 添加品牌按钮回调
const addTrademark = () => {
  // 对话框显示
  dialogFormVisible.value = true
}
// 修改品牌按钮回调
const updateTrademark = () => {
  // 对话框显示
  dialogFormVisible.value = true
}
// 对话框取消按钮回调
const cancelDialog = () => {
  // 对话框隐藏
  dialogFormVisible.value = false
}
// 对话框确定按钮回调
const confirmDialog = () => {
  // 对话框隐藏
  dialogFormVisible.value = false
}
// 上传图片前的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type === 'image/png' || rawFile.type === 'image/jpeg' || rawFile.type === 'image/gif') {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传图片大小不能超过4M'
      })
      return false
    }
  } else {
    ElMessage.error('上传格式务必为PNG/JPEG/GIF')
  }
  return true
}
// 上传图片成功的钩子函数
const handleAvatarSuccess: UploadProps['onSuccess'] = (response,uploadFile) => {
  // response即为当前上传图片post请求服务器返回的数据
  trademarkParams.logoUrl = response.data
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

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

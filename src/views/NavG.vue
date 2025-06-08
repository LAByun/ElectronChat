<template>
  <main style="display:flex;flex-direction: column; height: 100vh;">
    <div style="height: 30px;display:flex;app-region: drag; background-color: rgb(231, 231, 231);">
      <img style="width: 20px; height: 20px; margin-left: 20px;margin-top: 6px;" src="/src/assets/logo.svg" />
      <p style="margin: 0; margin-left: 10px; line-height: 30px;">流程测试</p>
    </div>
    <div style="display: flex; flex:1;background-color: #f5f7fa;align-items: stretch;">
      <div style="max-width: 20vw; display: flex;flex-direction: column;">

        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 10px;flex-wrap: nowrap;">
    <el-radio-button :value="false">ex</el-radio-button>
    <el-radio-button :value="true">col</el-radio-button>
  </el-radio-group> -->
        <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
          @close="handleClose">
          <el-menu-item index="0" @click="changeCollapse">
            <el-icon v-if="isCollapse">
              <ArrowRight />
            </el-icon>
            <el-icon v-else>
              <ArrowLeft />
            </el-icon>

            <template #title>
              <span>折叠</span>
            </template>
          </el-menu-item>
          <el-menu-item index="1" @click="toAdmin">
            <el-icon>
              <location />
            </el-icon>
            <template #title>
              <span>首页</span>
            </template>
          </el-menu-item>
          <el-menu-item index="2" @click="toPdf">
            <el-icon><icon-menu /></el-icon>
            <template #title>上传</template>

          </el-menu-item>
          <el-menu-item index="3" @click="toPdfcontrol">
            <el-icon>
              <document />
            </el-icon>
            <template #title>文档管理</template>
          </el-menu-item>
          <el-menu-item index="4" @click="toSetting">
            <el-icon>
              <setting />
            </el-icon>
            <template #title>设置</template>
          </el-menu-item>
        </el-menu>

      </div>

      <div style="flex: 1; margin: 10px;">

        <RouterView />
      </div>
    </div>
  </main>


</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import router from '@/router'
import { RouterView } from 'vue-router'
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
function changeCollapse() {
  isCollapse.value = !isCollapse.value
}
function toPdfcontrol() {
  //   router.push('/backControl/pdfControl')
}
function toSetting() {
  router.replace('/nav/setting')
}
function toAdmin() {
  router.replace('/nav/tablehome')
}
function toPdf() {
  //   router.push('/backControl/pdfLoad')
}
onMounted(() => {
  // router.push('test/admin')
})
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;

}

.el-menu-vertical-demo:is(.el-menu--collapse) {}

.el-menu-vertical-demo {
  border-right: 1px solid #dcdfe6;
  /* border-radius: 10px; */
  display: flex;
  flex-direction: column;
  flex: 1;


}
</style>

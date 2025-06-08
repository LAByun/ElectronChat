<template>
    <div class="setting-page">
        <h1>设置</h1>
        <form @submit.prevent="saveSettings">
            <div class="form-group">
                <label for="username">用户名</label>
                <input id="username" v-model="settings.username" type="text" />
            </div>
            <div class="form-group">
                <label for="email">邮箱</label>
                <input id="email" v-model="settings.email" type="email" />
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" v-model="settings.notifications" />
                    接收通知
                </label>
            </div>
            <button type="submit">保存设置</button>
        </form>
    </div>
</template>

<script setup>
import { reactive } from 'vue'

const settings = reactive({
    username: '',
    email: '',
    notifications: true
})

function saveSettings() {
    // 这里可以添加保存逻辑，比如调用API
    alert('设置已保存！')
}
</script>

<style scoped>
.setting-page {
    max-width: 400px;
    margin: 40px auto;
    padding: 24px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.form-group {
    margin-bottom: 16px;
}
label {
    display: block;
    margin-bottom: 6px;
    font-weight: bold;
}
input[type="text"],
input[type="email"] {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}
button {
    padding: 8px 24px;
    background: #42b983;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
button:hover {
    background: #369870;
}
</style>
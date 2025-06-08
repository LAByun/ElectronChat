<template>
  <div class="chat-container">
    <!-- 顶部标题栏 -->
    <div class="header">
      <div class="avatar">
        <i class="fas fa-robot"></i>
      </div>
      <h1>流程自助查询助手</h1>
    </div>

    <!-- 聊天消息区域 -->
    <div class="chat-messages">
      <div 
        v-for="(message, index) in messages"
        :key="index"
        class="message-wrapper"
        :class="message.sender === '你' ? 'user-message-wrapper' : 'ai-message-wrapper'"
      >
        <div class="message-bubble" :class="message.sender === '你' ? 'user-message' : 'ai-message'">
          <!-- <div class="sender">{{ message.sender }}</div> -->
          <div class="content" :class="message.sender === '你' ? '' : 'ai-message-border'">{{ message.text }}</div>
          <div class="content">{{ message.text1 }}</div>
          <div v-if="message.sender === '你' ? false:true">
            
            <div v-if="message.pdf ===''? false : true" style="width: 80vw;">
              <vue-pdf :source="message.pdf"></vue-pdf>

            </div>

          </div>
        </div>
      </div>

      <div v-if="isTyping" class="typing-wrapper">
        <div class="message-bubble ai-message">
          <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="input-area">
      <div class="input-wrapper">
        <el-input
          v-model="userInput"
          placeholder="请输入您的问题..."
          type="textarea"
          :rows="2"
          resize="none"
          @keydown.enter.prevent="handleEnter"
        />
        <el-button 
          type="primary" 
          class="send-btn"
          @click="sendMessage"
          :disabled="!userInput.trim()"
        >
        <el-icon style="margin-right: 10px;"><Position /></el-icon>
           发送
        </el-button>
      </div>
      <div class="input-tip">按 Enter 键发送，Shift+Enter 换行</div>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { ElInput, ElButton } from 'element-plus'
import VuePdf from 'vue-pdf-embed'
import axios from 'axios'
const userInput = ref('')
const messages = ref([])
const isTyping = ref(false)
const responce=ref('')
const index=ref(0)
const handleEnter = (e) => {
  if (!e.shiftKey) {
    sendMessage()
  }
}

const sendMessage = async () => {
  const content = userInput.value.trim()
  if (!content) return

  messages.value.push({
    sender: '你',
    text: content
  })
  index.value=index.value+1
  userInput.value = ''
  // isTyping.value = true
    messages.value.push({
      sender: 'AI',
      text: '正在思考中...',
      text1:"",
      pdf:""
    })

    // postWithStream()
    scrollToBottom()


}

const scrollToBottom = () => {
  nextTick(() => {
    const container = document.querySelector('.chat-messages')
    container.scrollTop = container.scrollHeight
  })
}

async function postWithStream() {
  const ask={
    "ask": messages.value[index.value-1].text
  }
  const response = await fetch('http://localhost:5000/getOllama', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ask), // 发送普通数据
    // 若要流式发送数据，可使用 ReadableStream：
    // body: new ReadableStream({...})
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  var check=0
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    // const chunk = decoder.decode(value);
    // console.log('实时数据块:', chunk);
 // 解码二进制数据并追加到缓冲区
 buffer += decoder.decode(value, { stream: true });

// 按换行符分割数据块（SSE标准格式）
const lines = buffer.split('\n');
for (let i = 0; i < lines.length - 1; i++) {
      const line = lines[i].trim();
      if (!line.startsWith('data: ')) continue;

      try {
        // 提取JSON字符串并解析
        const jsonStr = line.slice(6); // 移除"data: "前缀
        const jsonObj = JSON.parse(jsonStr);
        console.log('实时接收:', jsonObj.response); // 输出目标字段
        // responce.value=responce.value+jsonObj.response;
        if(jsonObj.response.includes("<think>")){
          isTyping.value = false
          jsonObj.response="";
          check=1;
        }
        if(jsonObj.response.includes("</think>")){
          jsonObj.response="";
          console.log("diaoyong2");
          check=0;
          console.log(check);
        }
        if(check === 1){
          messages.value[index.value].text=messages.value[index.value].text+jsonObj.response;
          console.log(check)

        }else{
          messages.value[index.value].text1=messages.value[index.value].text1+jsonObj.response;
          
          console.log("加载了的")
        }

        // console.log(index.value)
        // console.log(messages.value[index.value].text)
      } catch (err) {
        console.error('JSON解析失败:', err);
      }
    }
    //预防残缺
    buffer = lines[lines.length - 1];

    // 可在此处动态渲染到页面
  }
  console.log(buffer)
  const pdfurl=messages.value[index.value].text1.split("参考这个文件:")
  if(pdfurl.length ===2){
    messages.value[index.value].pdf=pdfurl[1]
  }

  index.value=index.value+1
 
}
const func = async () => {
  const response = await window.versions.ping()
  console.log(response) // 打印 'pong'
}
onMounted(async ()=>{
  // console.log(messages.value[index.value].text)
  // const message=await axios.post('http://localhost:5000/api/data',"nihao");
  // console.log('获取成功', message);
  //第一次加载脚本
  // const script=document.createElement('script');
  // script.src='../../src-electron/render.js';
  // script.onload = () => console.log('脚本加载成功');
  // script.onerror = () => console.error('脚本加载失败');
  // document.body.appendChild(script);
  func();
})
</script>

<style scoped>
/* 基础样式 */

.ai-message-border{
  border-left:3px solid rgb(231, 231, 231) ;
  padding-left: 10px;
}
.chat-container {
  max-width: 100vw;
  margin: 0 auto;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  /* background-color: #f8fafc; */

}

/* 头部样式 */
.header {
  border-radius: 10px;
  background: white;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 12px;
}

.header h1 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

/* 消息区域 */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;


}

.message-wrapper {
  display: flex;
  margin-bottom: 12px;
}

.user-message-wrapper {
  justify-content: flex-end;
}

.ai-message-wrapper {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 90%;
  border-radius: 18px;
  padding: 12px 16px;
  position: relative;
  animation: fadeIn 0.3s ease;
}

.user-message {
  background-color: #3b82f6;
  color: white;
}

.ai-message {
  background-color: white;
  color: #1f2937;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.sender {
  font-weight: 500;
  margin-bottom: 4px;
  font-size: 0.875rem;
}

.content {
  white-space: pre-wrap;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* 输入区域 */
.input-area {
  justify-self: flex-end;
  border-radius: 10px;
  /* height: 10%; */
  padding: 1rem;
  background: white;
  border-top: 1px solid #e5e7eb;
}

.input-wrapper {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.send-btn {
  height: auto;
  padding: 8px 16px;
}

.input-tip {
  font-size: 0.75rem;
  color: #6b7280;
  text-align: center;
}

/* 动画 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.typing-indicator {
  display: flex;
  padding: 12px 16px;
}

.typing-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #9ca3af;
  margin: 0 2px;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-dot:nth-child(1) { animation-delay: 0s; }
.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-5px); }
}
</style>
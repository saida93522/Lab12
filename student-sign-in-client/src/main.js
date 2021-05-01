import { createApp } from 'vue'
import App from './App.vue'
import StudentService from '@/services/StudentService.js'

let app = createApp(App)

app.config.globalProperties.$student_api = StudentService // getAllstudent and addStudent function

app.mount('#app')

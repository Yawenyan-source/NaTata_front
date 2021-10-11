<template>
	<el-form :model="LoginForm" class="loginContainer" :rules="rules" ref="LoginFormRef">
		<h3 class="loginTitle">系统登录</h3>
		<el-form-item prop="username">
			<el-input type="text" v-model="LoginForm.username" placeholder="请输入用户名"/>
		</el-form-item>
		<el-form-item prop="password">
			<el-input type="password" v-model="LoginForm.password" placeholder="请输入密码"/>
		</el-form-item>
		<el-form-item prop="code">
			<el-input
				type="text"
				v-model="LoginForm.code"
				placeholder="点击图片更换验证码"
				style="width: 250px; margin-right: 5px"
			/>
			<img :src="captchaUrl" @click="updateCaptcha" alt="验证码"/>
		</el-form-item>
		<el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>
		<el-button type="primary" @click="LoginSubmit" style="width: 100%">登录</el-button>
	</el-form>
</template>

<script setup lang="ts">
import {reactive, ref, unref} from "vue"
import {ElMessage, ElLoading} from 'element-plus'
import router from "../router";
import {postRequest} from "../utils/http/axios/axios";

let captchaUrl = ref('/api/captcha?time=' + new Date())

let checked = ref(true)

let LoginFormRef = ref(null)

let LoginForm = reactive({
	username: 'admin',
	password: '123',
	code: ''
})
const rules = reactive({
	username: [{
		required: true,
		message: '请输入用户名',
		trigger: 'blur'
	}],
	password: [{
		required: true,
		message: '请输入密码',
		trigger: 'blur'
	}],
	code: [{
		required: true,
		trigger: 'blur',
		message: '请输入验证码'
	}]
})
const LoginSubmit = async () => {
	const form: any = unref(LoginFormRef);
	//登录请求参数
	const LoginParams = {
		username: LoginForm.username,
		password: LoginForm.password,
		code: LoginForm.code
	}
	const loading = ElLoading.service({
		lock: true,
		text: 'Loading',
		spinner: 'el-icon-loading',
		background: 'rgba(0, 0, 0, 0.7)',
	})
	if (!form) return
	try {
		await form.validate();
		postRequest('/api/login1', LoginParams).then(resp => {
			if (resp) {
				//存储用户token
				const tokenStr: string = resp.data.obj.tokenHead + resp.data.obj.token;
				window.sessionStorage.setItem('tokenStr', tokenStr)
				router.replace('/home')
			}
		})
	} catch (e) {
		ElMessage({
			message: '请输入所有字段',
			type: 'error'
		})
	} finally {
		loading.close();
	}
}

function updateCaptcha() {
	captchaUrl.value = '/api/captcha?time=' + new Date()
}
</script>

<style>
.loginContainer {
	border-radius: 15px;
	background-clip: padding-box;
	margin: 180px auto;
	width: 350px;
	padding: 15px 35px 15px 35px;
	background: #fefefe;
	border: 1px solid #eaeaea;
	box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
	margin: 0 auto 40px auto;
	text-align: center;
	color: #505458;
}

.loginRemember {
	text-align: left;
	margin: 0 0 15px 0;
}

.el-form-item__content {
	display: flex;
	align-items: center;
}
</style>
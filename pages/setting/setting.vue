<template>
	<NavBar title="设置中心"></NavBar>
	<view>
		<uni-list >
			<uni-list-item  title="昵称" :rightText="pinia.user.username">
			</uni-list-item>
			<uni-list-item   title="版本号" :rightText="version">
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script setup>
	import {onLoad} from "@dcloudio/uni-app"
	import {ref} from "vue"
	import Pinia from "@/store/index.js"
	
	const pinia = Pinia()
	const version = ref("")
	onLoad(()=>{
		version.value = wx.getAccountInfoSync().miniProgram.version
	})
</script>

<style>

</style>

<template>
	<view :style="{height:bar.barHight+'px',paddingTop:bar.top+'px'}" class="titleBar">
		<view class="bar_left" v-if="isback" @tap="back">
			<text class="iconfont icon-danjiantouzuo"></text>
		</view>
		<view class="bar_cen">
			<text class="title">{{bar.title}}</text>
		</view>
		<slot></slot>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		ref,
		reactive,computed
	} from "vue"
	import Pinia from "@/store/index.js"
	import {isTabBar} from "@/uilts/isNetWork.js"
	const pinia = Pinia()
	const isback = ref(false)
	const bar = reactive({
		barHight: 0,
		top: 0,
		title: ""
	})
	const router = getCurrentPages()
	const props = defineProps({
		title:{
			type:String,
			default:""
		}
	})
	isback.value =  computed(()=>{
		console.log(router[0].route)
		if(router.length==1&&router[0].route=="pages/palyMovie/palyMovie")return true
		if(router.length<=1)return false;
		return true
	})
	function back(){
		if(router.length==1){
			uni.switchTab({url:"/pages/index/index"})
		}
		let routePage = router?.at(-2)?.route;
		const isSweich = isTabBar(routePage);
		isSweich?uni.switchTab({url:"/"+routePage}):uni.navigateBack({delta:1})
	}
	onLoad(() => {
		let systeminfo = uni.getSystemInfoSync();
		let rect = uni.getMenuButtonBoundingClientRect()
		bar.barHight = (rect.top - systeminfo.statusBarHeight) * 2 + rect.height
		bar.top = systeminfo.statusBarHeight
		const title = getCurrentPages().at(-1)
		bar.title = props.title
		pinia.navBarHight = (rect.top - systeminfo.statusBarHeight) * 2 + rect.height + systeminfo.statusBarHeight
	})
</script>

<style scoped>
	.titleBar {
		width: 750rpx;
		position: sticky;
		z-index: 10000;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
	}
	.title{
		text-align: center;
	}
	.bar_left{
		position: absolute;
		left: 30rpx;
	}
	.icon-danjiantouzuo{
		padding-right:30rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		display: inline-block;
	}
</style>

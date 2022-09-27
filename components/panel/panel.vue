<template>
	<view class="black">
		<view class="panel">
		    <view class="title">
				<text class="pan_title">历史搜索</text>
				<text class="pan_title iconfont icon-lajitong" style="font-size: 40rpx;" @tap.stop="clear"></text>
			</view>
			<view @tap.stop="tapPanel">
				<template v-for="(item,index) in listPanel" :key="index">
				    <text class="item" :data-value="item">{{item}}</text>
				</template>
			</view>
		</view>
	</view>
</template>

<script setup>
	import usepanel from "@/hooks/usePanel.js"
	import {onMounted,ref} from "vue"
	const listPanel = ref([])
	const {
		getpanel,
		clearpanel
	} = usepanel()
	
	onMounted(() => {
		
		listPanel.value = getpanel()
	})
	function clear(){
		listPanel.value=[]
		clearpanel()
	}
	function tapPanel(e) {
		let value = e.target.dataset.value;
		if(!value)return
		uni.navigateTo({
			url: "/pages/search/search?searchValue=" + value
		})
	}
</script>

<style scoped>
	.panel {
		position: absolute;
		width: 700rpx;
		min-height: 200rpx;
		background-color: #fff;
		padding-top: 15rpx;
		padding: 0 25rpx;
	}
	
	.title{
		display: flex;
		justify-content: space-between;
	}
	
	.pan_title {
		color: #ababab;
		font-size: 30rpx
	}

	.item {
		font-size: 30rpx;
		background-color: #d3d3d3;
		border-radius: 20rpx;
		padding: 8rpx;
		margin: 15rpx 10rpx;
		color: #646464;
	}

	.black {
		background-color: rgb(0, 0, 0, 0.5);
		position: absolute;
		z-index: 10;
		width: 750rpx;
		height: 100vh;
	}
</style>

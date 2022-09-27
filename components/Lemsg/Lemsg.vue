<template>
	<view class="showInfoRep" v-if="showPanel" :style="{top:top+'rpx'}">
			<view class="head">
				<text style="font-size: 35rpx;">评论详情</text>
				<text @tap="hideRep">x</text>
			</view>
			<scroll-view class="cont" scroll-y="true" @scrolltolower="onBottom" lower-threshold="40"  :style="{height:listHight+'px'}">
				<PinItem :item="item"  :showRep="false"/>
				<view class="body">
					<text class="b_textTit">共{{item.reply?.length}}条回复</text>
					<template v-for="(rep,index) in item.reply" :key="index">
						<PinItem :item="rep" :showRep="false"/>
					</template>
				</view>
			</scroll-view>
	</view>
</template>

<script setup>
	import {
		ref,
		inject,
		nextTick,
		reactive
	} from "vue"
	import PinItem from "@/components/PinItem/PinItem.vue"
	import Pinia from "@/store/index.js"
	const pinia = Pinia()
	const showPanel = ref(false)
	const item = ref({})
	const repList = ref([])
	const top = ref(1500)
	const page =  ref(10)
	const props = defineProps({
		listHight:{
			type:Number,
			default:0
		},
	})
	defineExpose({
		infoList,
		hideRep
	})
	function infoList(obj) {
		item.value = obj;
		repList.value = item.value.reply?.slice(0,page.value)
		showPanel.value = true
		nextTick(()=>{
			top.value= 0
		})
		
	}
	function hideRep() {
		top.value= 1500
		nextTick(()=>{
			showPanel.value = false
		})
		
	}
	function onBottom(){
		let arr = item.value.reply?.slice(page.value,page.value+10)
		if(arr.length==0)return
		repList.value.push(...arr)
		page.value= page.value +10
	}
</script>

<style scoped>

	.showInfoRep {
		position: absolute;
		width: 750rpx;
		height: 100%;
		background-color: #fff;
		z-index: 8;
		left: 0;
		transition: all 0.5s;
	}

	.rep_body {
		
	}

	.head {
		display: flex;
		justify-content: space-between;
		height: 80rpx;
		width: 700rpx;
		line-height: 80rpx;
		border-bottom: 1px solid #dedede;
		padding: 0 25rpx;
	}
	.cont{
		margin: 0 25rpx;
		margin-top: 10rpx;
	}
	.body{
		/* padding-bottom: 130rpx; */
	}

	.b_textTit{
		font-size: 30rpx;
		color: #9a9a9a;
		margin-bottom: 15rpx;
		display: block;
	}
</style>

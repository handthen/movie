<template>
	<view class="box" v-if="item.reply?.length!=0" @tap.self="infoList">
		<view class="">
			<text>{{item.reply[0].username}} </text>
			<text >{{item.reply[0].text}}</text>
		</view>
		<text>共{{item.reply.length}}条回复 ></text>
	</view>
	<view class="showInfoRep" v-if="showPanel" :style="{top:top+'rpx'}">
		<view class="rep_body">
			<view class="head">
				<text style="font-size: 35rpx;">评论详情</text>
				<text @tap="hideRep">x</text>
			</view>
			<view class="cont" :style="{height:listHight+'px'}">
				<PinItem :item="item" :showRep="false" />
				<view class="body">
					<text class="b_textTit">共{{item.reply.length}}条回复</text>
					<template v-for="(rep,index) in item.reply" :key="index">
						<PinItem :item="rep" />
					</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		inject,
		nextTick,
	} from "vue"
	import PinItem from "@/components/PinItem/PinItem.vue"
	import Pinia from "@/store/index.js"
	const pinia = Pinia()
	const top = ref(1500)
	const showPanel = ref(false)
	const props = defineProps({
		item: {
			type: Object,
			default: {}
		},
		listHight:{
			type:Number,
			default:0
		}
	})
		
    const  repUser =inject("repUser")
	function infoList() {
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
</script>

<style scoped>
	.box {
		background-color: #e7e7e7;
		border-radius: 20rpx;
		width: 100%;
		padding: 15rpx;
		box-sizing: border-box;
		margin-top: 15rpx;
		margin-left: 64rpx;
		font-size: 30rpx;
	}

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
		overflow-y: auto;
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

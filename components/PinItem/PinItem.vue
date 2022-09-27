<template>
	<view class="pin_item">
		<!-- <ImageLoad :src="item.avatar" class='pin_img'></ImageLoad> -->
		<image :src="item.avatar" class='pin_img'></image>
		<view class="pin_right">
			<text class="username">{{item.username}}</text>
			<text class="pin_time">{{formatTime(item.time)}}</text>
			<text class="pin_text" user-select>{{item.text}}</text>
			<view class="pin_lemsg">
				<text class="iconfont icon-dianzan"></text>
				<text style="font-size: 30rpx;">{{item.give||0}}</text>
				<text class="iconfont icon-xiaoxi" @tap.stop="replyUser(item._id,item.username)"></text>
			</view>
			<view class="box" v-if="item?.reply?.length>0&&showRep" @tap.stop="show">
				<view class="">
					<text>{{item?.reply[0]?.username}} </text>
					<text>{{item?.reply[0]?.text}}</text>
				</view>
				<text>共{{item?.reply.length}}条回复 ></text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		formatTime
	} from "@/uilts/getMovieCount.js"
	import MsgPin from "@/components/Lemsg/Lemsg.vue"
	import {
		getCurrentInstance,
		inject
	} from "vue"
	const props = defineProps({
		item: {
			type: Object,
			default: {}
		},
		showRep:{
			type: Boolean,
			default: true
		},
		refPan:{
			type: Object,
			default: {}
		}
	})
	const repUser = inject("repUser")
	function show(){
		console.log(props.refPan)
		props.refPan.infoList(props.item)
	}
	function replyUser(_id, username) {
		repUser(_id, username)
	}
</script>

<style scoped>
	.pin_item {
		display: flex;
		margin-bottom: 15rpx;
	}

	.pin_img {
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
		padding: 0;
	}

	.pin_lemsg {
		display: flex;
	}

	.pin_right {
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
	}

	.icon-xiaoxi {
		margin-left: 80rpx;
		vertical-align: bottom;
	}

	.username {}

	.pin_time {
		font-size: 25rpx;
		margin: 10rpx 0;
	}

	.pin_text {
		font-size: 38rpx;
		margin-bottom: 15rpx;
	}

	.comments>>>.loading {
		top: 70%;
	}

	.comments {
		overflow: auto;
	}

	.box {
		background-color: #e7e7e7;
		border-radius: 20rpx;
		width: 100%;
		padding: 15rpx;
		box-sizing: border-box;
		margin-top: 15rpx;
		font-size: 30rpx;
	}
</style>

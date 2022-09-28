<template>
	<view class="pin_item">
		<!-- <ImageLoad :src="item.avatar" class='pin_img'></ImageLoad> -->
		<image :src="item.avatar" class='pin_img'></image>
		<view class="pin_right">
			<view class="pinListRep" v-if="!showRep">
				<text class="username">{{item.username}}</text>
				<text class="iconfont icon-xiaoxi" @tap.stop="replyUser(item._id,item.username)"></text>
			</view>
			 <text class="username" v-else>{{item.username}}</text>
			<text class="pin_time">{{formatTime(item.time)}}</text>
			<text class="pin_text" user-select>{{item.text}}</text>
			<view class="pin_lemsg">
				<text class="iconfont icon-dianzan" v-if="showRep" :class="{dianzanAc:isGive}" @tap="dianzan(item._id)"></text>
				<text style="font-size: 30rpx;vertical-align: middle;" v-if="showRep">{{dianzanLen||0}}</text>
				<text class="iconfont icon-xiaoxi" v-if="showRep" @tap.stop="repUser(item._id,item.username)"></text>
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
	import Pinia from "@/store/index.js"
	import {
		getCurrentInstance,
		inject,
		computed,
		ref
	} from "vue"
	const pinia = Pinia()
	const dianzanLen = ref(0)
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
	let isGive = computed(()=>{
		let arr = props.item.give;
		return arr.some(v=>v.openid==pinia.user.openid)
	})
	 dianzanLen.value = props.item.give?.length||0
	const repUser = inject("repUser")
	function show(){
		console.log(props.refPan)
		props.refPan.infoList(props.item)
	}
	async function dianzan(_id){
		const {code,state} = await uni.$cloud("signDianzan",{_id})
		isGive = !!state
		if(isGive){
			 ++dianzanLen.value
		}else{
			 dianzanLen.value<=0?0:(--dianzanLen.value)
		}
	}
</script>

<style scoped>
	.pin_item {
		display: flex;
		/* width: 710rpx; */
		margin-bottom: 15rpx;
	}
	.dianzanAc{
		color: red;
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
		margin-left:20rpx;
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
	.pinListRep{
		display: flex;
		justify-content: space-between;
	}
</style>

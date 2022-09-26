<template>
	<NavBar title="我的"/>
	<view class="user">
		<view class="avatar">
			<button open-type="chooseAvatar" class="avatarBtn" id="chooseavatar" @chooseavatar="choose" ref="tap">
				<image :src="user.avatarUrl" class="avatar" mode="aspectFill"></image>
			</button>
		</view>
		<view class="username">
			<input placeholder="输入昵称" type="nickname" class="text" :value="user.username" @change="change" />
		</view>
	</view>
	<view class="listTag">
		<uni-list >
			<uni-list-item showArrow >
				<template v-slot:body>
					<text class="iconfont icon-huiyuan list_text"></text>
					<text class="list_text" >我的会员</text>
				</template>
			</uni-list-item>
			<uni-list-item showArrow  to="/pages/collection/collection">
				<template v-slot:body>
					<text class="iconfont icon-shoucang list_text"></text>
					<text class="list_text">我的收藏</text>
				</template>
			</uni-list-item>
			<uni-list-item showArrow to="/pages/historyList/historyList">
				<template v-slot:body>
					<text class="iconfont icon-bofangjilu list_text"></text>
					<text class="list_text">观看记录</text>
				</template>
			</uni-list-item>
			<uni-list-item showArrow  to="/pages/download/download">
				<template v-slot:body>
					<text class="iconfont icon-xiazai list_text"></text>
					<text class="list_text">离线缓存</text>
				</template>
			</uni-list-item>
			<uni-list-item showArrow to="/pages/feedback/feedback">
				<template v-slot:body>
					<text class="iconfont icon-yijianfankui list_text"></text>
					<text class="list_text">意见反馈</text>
				</template>
			</uni-list-item>
			<uni-list-item showArrow  to="/pages/setting/setting">
				<template v-slot:body>
					<text class="iconfont icon-shezhi list_text"></text>
					<text class="list_text">设置中心</text>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onLoad,
	} from '@dcloudio/uni-app'
	import Pinia from "@/store/index.js"
	import {
		storeToRefs
	} from "pinia"

	let pinia = Pinia()
	let {user} = storeToRefs(pinia)
	let page = ref(0)

	function choose(e) {
		const avatarUrl = e.detail.avatarUrl
		pinia.setuser({
			avatarUrl
		})
		uni.setStorageSync("avatarUrl", avatarUrl)
		wx.cloud.uploadFile({
			cloudPath: "movie_userAvatar/user-"+pinia.user.openid,
			filePath: avatarUrl,
			success(resp) {
				console.log(resp)
				pinia.setuser({cloudAvatar:resp.fileID})
				uni.setStorageSync("cloudAvatar", resp.fileID)
			}
		})
		
	}

	function change(e) {
		const username = e.detail.value
		pinia.setuser({
			username
		})
		uni.setStorageSync("username", username)
	}
</script>

<style scoped>
	.list_text {
		font-size: 34rpx;
		color: #3b4144;
	}
	.listTag .iconfont{
		font-size: 45rpx;
		padding-right: 10rpx;
		vertical-align: middle;
		color: red;
	}

	>>>.uni-list-item__container {
		/* padding: 0; */
	}

	.slider {
		width: 750rpx;
	}

	.slider-emoji {
		width: 750rpx;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;


	}

	.slider-emoji-icon {
		width: 53%;
		text-align: center;
		/* padding: 10.5px 0; */
	}

	.lastbox {
		justify-content: flex-start;
	}

	.user {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 30rpx 0 50rpx 0;
	}

	.avatar {
		width: 128rpx;
		height: 128rpx;
	}

	.avatar image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.username {
		display: flex;
		align-items: center;
	}

	.avatarBtn {
		width: 128rpx;
		height: 128rpx;
		border-radius: 50%;
		padding: 0;
	}

	.text {
		text-align: center;
	}
</style>

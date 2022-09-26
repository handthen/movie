<template>
	<page-meta :page-style="`overflow:${curtain?'hidden':'visible'}`"></page-meta>
	<NavBar title="主页"/>
	<view class="" >
		<view class="search">
			<text class="iconfont icon-sousuo"></text>
			<input type="text" v-model="value" placeholder="请输入内容" class="search-input" 
			 @focus="curtain =true"  @confirm="search" />
		</view>
		<view @tap="curtain = false">
			<Panel v-if="curtain"/>
		</view>

		<view class="main" >
			<swiper class="swiper-box" @change="change" :current="0" :interval="3000" :autoplay="true"
			:indicator-dots="true" :circular="true">
				<swiper-item v-for="(item, index) in images" :key="index" >
					<view class="swiper-item" :class="'swiper-item' + index"  @tap="moviePlay(item.vod_id)">
						<image class="swiperImg" :lazy-load="true" :src="item.imgUrl" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
			
			<view class="container" v-if="refresh">
				<view class="" @tap="moviePlay">
				   <SwperMovie :tid="25" title="日漫"/>
				   <SwperMovie :tid="24" title="国漫"/>
				   <SwperMovie :tid="26" title="欧美动漫"/>
				   <SwperMovie :tid="2" title="电影"/>
				   <SwperMovie :tid="1" title="电视剧"/>
				   <SwperMovie class="aaa" :tid="11" title="喜剧"/>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import Pinia from "@/store/index.js"
	import {
		reactive,
		ref,
		inject,
		onMounted,
		nextTick
	} from "vue"
	import {onLoad,onPullDownRefresh,onReady} from "@dcloudio/uni-app"
	import {getDiffuseApi} from "@/http/meApi/index.js"
	import {UrlToBack} from "@/http/index.js"
	import SwperMovie from "@/components/swperMovie/swperMovie.vue"
	import Panel from "@/components/panel/panel.vue"
	import usepanel from "@/hooks/usePanel.js"
	const {setpanel} =usepanel()
	const images = [
		{
			imgUrl:"https://handthen.github.io/static/3228.jpg",
			vod_id:25538
		},{
			imgUrl:"https://handthen.github.io/static/33456.jpg",
			vod_id:20535
		},{
			imgUrl:"https://handthen.github.io/static/621230.jpg",
			vod_id:19995
		}
	]
	const isShow = ref(true)
	const value = ref("")
	const curtain = ref(false)
	const pinia = Pinia()
	const refresh= ref(true)
	const moviePlay = inject("moviePlay",moviePlay)
	onMounted(()=>{
	})
	onLoad(()=>{
		const openid = uni.getStorageSync("openid")
		if(!openid){
			wx.cloud.callFunction({
				name:"movie",
				data:{
					type:"getUser"
				}
			})
			.then(res=>{
				const {openid} = res.result
				pinia.setuser({openid})
				uni.setStorageSync("openid",openid)
			})
		}
		
	})
	function search(){
		if(!value.value)return
		setpanel(value.value)
		uni.navigateTo({
			url:"/pages/search/search?searchValue="+value.value
		})
		value.value = ""
	}
	onPullDownRefresh(()=>{
		refresh.value = false;
		nextTick(()=>{
			refresh.value = true;
			uni.stopPullDownRefresh()
		})
		
	})
</script>

<style scoped>
	.container{
		margin: 25rpx;
	}
	.search{
		position: relative;
		width: 750rpx;
		padding: 20rpx 0;
		background-color: #fff;
	}
	.search-input{
		background-color: white;
		width: 600rpx;
		border-radius: 20rpx;
		border: 1px solid red;
		height: 10rpx;
		margin: auto;
		padding-left: 50rpx;
		font-size: 30rpx;
	}

	.icon-sousuo{
		position: absolute;
		left:55rpx;
		top: 30rpx;
		color: red;
	}
	.swiper-box {
		height: 300rpx;
	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 300rpx;
		color: #fff;
	}

     .swiperImg{
    	width: 750rpx;
        height: 300rpx;
   }

	.image {
		width: 750rpx;
	}
	
</style>

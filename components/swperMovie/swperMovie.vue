<template>
	<view class=""  @tap.stop="getInfo">
		<view class="con-top">
			<text style="title">推荐 - {{title}}</text>
			<text class="iconfont icon-jiantouyou" @tap.stop="toAll" v-if="back"></text>
		</view>
		<scroll-view class="con-body" :scroll-x="true" :enable-flex="true" :show-scrollbar="false">
			<template v-for="(item,index) in data" :key="item.vod_id">
				<view class="body-movie">
					<ImageLoad :src="item.vod_pic" :vod_id="item.vod_id"></ImageLoad>
					<text class="movie-name">{{item.vod_name}}</text>
				</view>
			</template>
		</scroll-view>
	</view>
		
</template>

<script setup>
	import {onMounted,inject,ref,watch} from "vue"
	import Pinia from "@/store/index.js"
	import {getDiffuseApi} from "@/http/meApi/index.js"
	const pinia = Pinia()
	const data = ref([])
	const props = defineProps({
		tid:{
			type:Number,
			default:1
		},
		title:{
			type:String,
			default:""
		},
		back:{
			type:Boolean,
			default:true
		}
	})
	const moviePlay = inject("moviePlay")
	onMounted(()=>{
		init(props.tid)
	})
	async function init(tid){
		try{
			const {list}= await getDiffuseApi({tid})
			data.value = list
		}catch(e){
			console.log(e)
		}
	}
	function loadImg(e){
		isImage.value = false
	}
	function toAll(){
		let tid = props.tid
		if(!tid)return
		pinia.classif = tid
		uni.switchTab({
			url:"/pages/classif/classif"
		})
	}
</script>

<style scoped>
    .img-cover{
		width: 200rpx;
		height: 250rpx;
	}
	.loadImg{
		width: 0;
		height: 0;
	}
	.body-movie{
		display: flex;
		flex-direction: column;
		width: 200rpx;
		margin-right: 20rpx;
	}
	.con-body{
		height: 300rpx;
		margin: 20rpx 0;
		display: flex;
		flex-direction: row;
	}

	.movie-name{
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-weight: 400;
		font-size: 35rpx;
	}
	.con-top{
		display: flex;
		justify-content: space-between;
	}
	.icon-jiantouyou{
		font-weight: 700;
		color: #a3a3a3;
		padding-left: 30rpx;
	}
</style>

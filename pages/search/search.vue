<template>
	<NavBar ></NavBar>
	<view class="search_con" >
		<view class="search" :style="{top:pinia.navBarHight+'px'}">
			<text class="iconfont icon-sousuo"></text>
				<input @confirm="search" v-model="value"  type="text" class="search-input"
					confirm-type="search"  />
		</view>
		<view class="search_list">
			<Loading v-if="loading"/>
			<template v-for="item in list" :key="item.vod_id">
				<view class="list_item">
					<view class="item_img">
						<ImageLoad :src="item.vod_pic" :vod_id="item.vod_id"></ImageLoad>
					</view>
					<view class="item_text">
						<view class="item_jianjie">
							<text style="font-size: 35rpx;color: red;" class="text">{{item.vod_name}}</text>
							<text>{{item.vod_area+"|"+item.vod_year}}</text>
							<text class="text">{{"导演:"+item.vod_director}}</text>
							<text class="text">{{"主演:"+item.vod_actor}}</text>
						</view>
						<button class="play_btn" @tap="toPlay(item.vod_id)">立即播放</button>
					</view>
				</view>
			</template>
			<view class="empty" v-if="list.length == 0&&value!=''&&loading!=true">
				<text style="color: #cccccc;">暂无数据</text>
			</view>
		</view>
	</view>

</template>

<script setup>
	import {
		reactive,
		ref,
		onUnmounted
	} from "vue"
	import {
		getSearchApi
	} from "@/http/meApi/index.js"
	import {onReachBottom,onLoad} from "@dcloudio/uni-app"
	import Pinia from "@/store/index.js"
	const pinia =Pinia()
	const loading = ref(false)
	const value = ref("")
	const isBottom = ref(false)
	const list = ref([])
	const page = reactive({
		limit: 10,
		pg: 1,
	})
	const emit = defineEmits(["update:show"])
	onLoad(({searchValue})=>{
		value.value = searchValue
		getList(searchValue)
	})
	function search(e) {
		getList(e.target.value)
	}
	async function getList(value) {
		try{
			loading.value = true
			const {
				list:data
			} = await getSearchApi({
				wd: value,
				limit: page.limit,
				pg: page.pg
			})
			list.value = data
			title.value = data.length
			if (data.length < 10) {
				isBottom.value = true
			}
			loading.value = false
		}catch{
			loading.value = false
		}
		
	}
	function toPlay(id){
		uni.navigateTo({
			url:"/pages/palyMovie/palyMovie?id="+id
		})
	}
	onReachBottom(() => {
		if(!value.value)return
		if (isBottom.value) {
			return uni.showToast({
				title: "没有更多数据了",
				icon: "none"
			})
		}
		loading.value = true
		page.pg = page.pg + 1
		try{
			getSearchApi({
					wd: value.value,
					limit: page.limit,
					pg: page.pg
				})
				.then(res => {
					const {
						list:data
					} = res;
					if (data.length < 10) {
						isBottom.value = true
					}
					list.value.push(...data)
					loading.value = false
				})
		}catch{
			loading.value = false
		}
	})
</script>

<style scoped>
	.search{
		position: sticky;
		z-index: 1000;
		width: 750rpx;
		margin-top: 20rpx;
		padding-bottom: 20rpx;
		background-color: #fff;
	}
	
	.icon-sousuo{
		position: absolute;
		left:55rpx;
		top: 10rpx;
		color: red;
	}
	.search_list {
		background-color: #fff;
		width: 750rpx;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.search_list .loading {
		border: none;
		font-size: 35rpx;
		transform: translate(0,300rpx);
	}

	.search_con {
		width: 750rpx;
		background-color: #fff;
	}

	.search_con .search {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}

	.search_con .search-input {
		background-color: white;
		width: 600rpx;
		border-radius: 20rpx;
		border: 1px solid red;
		height: 10rpx;
		margin: auto;
		font-size: 30rpx;
		padding-left: 80rpx;
	}

	.search_con .icon-sousuo {
		left: 40rpx;
	}

	.list_item {
		display: flex;
		margin: 15rpx 25rpx;
		height: 250rpx;
	}

	.item_img,
	.img {
		width: 200rpx;
		height: 250rpx;
	}

	.item_text {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin: 0 20rpx;
		overflow: hidden;
	}

	.item_jianjie {
		display: flex;
		flex-direction: column;
		font-size: 30rpx;

	}

	.list_item .play_btn {
		width: 200rpx;
		height: 55rpx;
		background-image: linear-gradient(to right,#ff0000,#ff8317);
		margin: 0;
		padding: 0;
		font-size: 30rpx;
		color: #fff;
		line-height: 55rpx;
	}

	.text {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		width: 700rpx;
	}
	.empty{
		text-align: center;
		transform: translate(0,300rpx);
	
	}

</style>

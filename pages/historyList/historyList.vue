<template>
	<NavBar title="观看记录" />
	<view class="search_list">
		<button loading="true" plain="true" v-if="loading" class="loading"></button>
		<template v-for="item in list" :key="item.movie.vod_id">
			<view class="list_item" >
				<view class="item_img">
					<ImageLoad :src="item.movie.vod_pic" :vod_id="item.movie.vod_id"></ImageLoad>
				</view>
				<view class="item_text">
					<view class="item_jianjie">
						<view class="name">
							<text style="font-size: 35rpx;color: red;" class="text">{{item.movie.vod_name}}</text>
							<text class="name_btn" @tap.stop="clear(item.movie.vod_id)">x</text>
						</view>
						<text class="text">{{item.movie.vod_area+"|"+item.movie.vod_year}}</text>
						<text class="text">{{"导演:"+item.movie.vod_director}}</text>
						<text class="text">{{"主演:"+item.movie.vod_actor}}</text>
					</view>
					<view class="bottom">
						<!-- <button class="play_btn" >立即播放</button> -->
						<text style="font-size: 25rpx;">{{"第"+(item.count+1)+"集"}} {{formMovieTime(item.movie_time)}}</text>
						<text style="font-size: 20rpx;">{{formatTime(item.time)}}</text>
					</view>
				</view>
			</view>

		</template>
		<view class="empty" v-if="list.length == 0&&loading!=true">
			<text style="color: #cccccc;">暂无数据</text>
		</view>
	</view>
	<button class="clear" @tap="clear()" plain="true">清空记录</button>
</template>

<script setup>
import {
	reactive,
	ref,
	onUnmounted,
	inject
} from "vue"
import {
	getSearchApi
} from "@/http/meApi/index.js"
import {
	onReachBottom,
	onHide,
	onLoad
} from "@dcloudio/uni-app"
import Pinia from "@/store/index.js"
import { formatTime,formMovieTime } from "@/uilts/getMovieCount.js"
const pinia = Pinia()
const loading = ref(false)
const isBottom = ref(false)
const list = ref([])
const page = reactive({
	limit: 10,
	pg: 1,
})

onLoad(() => {
	loading.value = true
	getList()
		.finally(() => {
			loading.value = false
		})

})
async function getList() {
	const { code, data } = await uni.$cloud("getHistory", { ...page, openid: pinia.user.openid })
	list.value = data
}

onReachBottom(() => {
	if (isBottom.value) {
		return uni.showToast({
			title: "没有更多数据了",
			icon: "none"
		})
	}
	loading.value = true
	page.pg = page.pg + 1
	try {
		uni.$cloud("getHistory", { ...page, openid: pinia.user.openid })
			.then(res => {
				const {
					data, code
				} = res;
				if (data.length < 10) {
					isBottom.value = true
				}
				list.value.push(...data)
				loading.value = false
			})
	} catch {
		loading.value = false
	}
})
async function clear(vod_id) {
	const { code } = await uni.$cloud("clearHistory", { vod_id })
	if (code == 200) {
		list.value = list.value.filter(v => v.movie.vod_id != vod_id)
		!vod_id && (list.value = [])
		uni.showToast({
			title: "清除成功",
			icon: "none"
		})
	}
}


onUnmounted(() => {
	isBottom.value = false
	list.value = []
	page.limit = 10;
	page.pg = 1
})
</script>

<style scoped>
.clear {
	position: fixed;
	bottom: 50rpx;
	right: 0;
	width: 200rpx;
	height: 60rpx;
	font-size: 30rpx;
	padding: 0;
	margin: 0;
	line-height: 60rpx;
	color: #ff0000;
	border: none;
	z-index: 100;
}

.search_list {
	position: sticky;
	z-index: 99;
	background-color: #fff;
	width: 750rpx;
	height: 100%;
	display: flex;
	flex-direction: column;
}

.bottom {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.time {
	display: flex;
	flex-direction: column;
	text-align: center;

}

.item_text .text {
	font-size: 30rpx;
}

.search_list .loading {
	border: none;
	font-size: 35rpx;
	transform: translate(0, 300rpx);
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
	background-image: linear-gradient(to right, #ff0000, #ff8317);
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

}

.empty {
	text-align: center;
	transform: translate(0, 300rpx);
}

.name {
	display: flex;
	justify-content: space-between;
}

.name_btn {
	font-size: 35rpx;
	color: #cac4c9;
}
</style>

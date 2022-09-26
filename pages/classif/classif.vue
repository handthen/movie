<template>
	<NavBar title="分类" />
	<view class="tag" :style="{top:pinia.navBarHight+'px'}">
		<scroll-view class="title1" :scroll-x="true" scroll-with-animation="true" :scroll-into-view="Ontitle"
			:enable-flex="true">
			<template v-for="(item,index) in movieTypeList" :key="item.type_id">
				<text :id="('title'+item.type_id)" class="item" :class=" {active:Ontitle==('title'+item.type_id)}"
					@tap="Ontapbar(item.type_id)">{{item.type_name}}</text>
			</template>
		</scroll-view>
	</view>
	<loading v-if="loading"></loading>
	<scroll-view>
		<view class="lists" @tap="toplay">
			<view class="list_item" v-for="item in movieList" :key="item.vod_id">
				<ImageLoad :src="item.vod_pic" :vod_id="item.vod_id"></ImageLoad>
				<text class="text">{{item.vod_name}}</text>
			</view>
			<loading v-if="buttomLoading"></loading>
		</view>
	</scroll-view>
</template>

<script setup>
import {
	ref,
	reactive
} from "vue"
import {
	getMovieType,
	getFenleiApi
} from "@/http/meApi/index.js"
import {
	onLoad,
	onShow,
	onReachBottom
} from "@dcloudio/uni-app"
import { wxTask } from "@/http/index.js"
import Pinia from "@/store/index.js"

const pinia = Pinia()
const movieTypeList = ref([])
const movieList = ref([])
const Ontitle = ref("")
const isEnd = ref(false)
const loading = ref(false)
const buttomLoading = ref(false)
const page = reactive({
	limit: 15,
	pg: 1
})

onShow(()=>{
	let tid = pinia.getClass
	loading.value = true
	getType(tid)
})

async function getType(tid) {
	const {
		class: data
	} = await getMovieType()
	movieTypeList.value = data.sort((a, b) => {
		if (!a.type_id) {
			return 0
		}
		return a.type_id - b.type_id
	}).filter(v=>v.type_name!="伦理片")
	!tid && (tid = movieTypeList.value[0].type_id)
	!tid && (tid = movieTypeList.value[0].id)
	Ontitle.value = "title" + tid
	getlist(tid)
}

async function getlist(id) {
	try {
		const {
			list: data
		} = await getFenleiApi({
			t: id,
			limit: page.limit,
			pg: page.pg
		})
		movieList.value = data
		if (data.length < 15) isEnd.value = true
		loading.value = false
	} catch (e) {
		uni.showToast({
			title: "获取失败",
			icon: "none"
		})
		loading.value = false
	}
}

function Ontapbar(id) {
	uni.pageScrollTo({
		scrollTop:0
	})
	movieList.value=[]
	loading.value = true
	Ontitle.value = "title" + id
	wxTask && wxTask.abort()
	// wxTask=null
	page.limit = 15
	page.pg = 1
	getlist(id)
}

function toplay(e) {
	let id = e.target.dataset.id
	if (!id) return
	uni.navigateTo({
		url: "/pages/palyMovie/palyMovie?id=" + id
	})
}

onReachBottom(() => {
	if (isEnd.value) {
		return uni.showToast({
			title: "没有更多数据了",
			icon: "none"
		})
	}
	buttomLoading.value = true
	page.pg = page.pg + 1;
	let id = Ontitle.value.replace("title", "")
	getFenleiApi({
		t: id,
		limit: page.limit,
		pg: page.pg
	}).then(res => {
		let { list: data } = res;
		movieList.value.push(...data)
	}).finally(() => {
		buttomLoading.value = false
	})
})
</script>

<style scoped>
.tag {
	position: sticky;
	background-color: #fff;
	z-index: 99;
}

.lists>>>.loading {
	position: relative;
	display: block;
	width: 750rpx;
}

.title1 {
	display: flex;
	height: 60rpx;
	margin: 20rpx 0;

}

.item {
	display: block;
	white-space: nowrap;
	padding: 0 20rpx;
	height: 60rpx;
	font-size: 33rpx;
}

.active {
	color: red;
}

.list_img {
	width: 200rpx;
	height: 250rpx;
}

.lists {
	display: flex;
	margin: 0 25rpx;
	white-space: normal;
	flex-wrap: wrap;
	justify-content: space-around;
}

.list_item {
	display: flex;
	flex-direction: column;
	overflow: hidden;
	white-space: nowrap;
	width: 200rpx;
	margin-bottom: 30rpx;
}

.loading {
	border: none;
	text-align: center;
}
</style>

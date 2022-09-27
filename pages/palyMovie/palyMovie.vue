<template>
	<page-meta :page-style="`overflow:${threshold.isShowModel?'hidden':'visible'}`"></page-meta>
	<NavBar />
	<view>
		<video class="myVideo" id="video" :src="currentUrl" @error="videoErrorCallback" enable-danmu danmu-btn controls
			show-loading :title="movie.vod_name" :poster="movie.vod_pic" :autoplay="true" :danmu-list="danmuList"
			enable-play-gesture="true" @timeupdate="currentTime" @ended="nextVideo" :play-strategy="2" :show-casting-button='true'
		   show-screen-lock-button="true" :initial-time="currTime"></video>
	</view>
	<view class="body">
		<view class="tagTitle">
			<text class="tag" :class="{active:active==0||active==2}" @tap="()=>{active=0;placeholder='发弹幕'}">简介</text>
			<text class="tag" :class="{active:active==1}" @tap.self="getPinlun">评论</text>
		</view>
		<view class="tagBody" v-show="threshold.isShow" >
			<view v-show="active==0" class="infomation" :style="{height:overHeight+'px'}">
				<view class="movie_title">
					<text class="movie_name">{{movie.vod_name}} <text
							style="font-size: 35rpx;">{{movie.vod_score}}</text></text>
					<text class="movie_tag">{{movie.vod_year}}/{{movie.vod_area}}/{{movie.vod_tag}}</text>
				</view>
				<view class="movie_oper">
					<view class="oper">
						<text class="iconfont icon-yijianfankui" @tap="feedback"></text>
						<text>反馈</text>
					</view>
					<view class="oper" @tap="dowm">
						<text class="iconfont icon-xiazai"></text>
						<text>下载</text>
					</view>
					<view class="oper" @tap="setcollection">
						<text class="iconfont"
							:class="{activeCollection:threshold.isColl,'icon-shoucang1':threshold.isColl,'icon-shoucang':!threshold.isColl}"></text>
						<text>收藏</text>
					</view>
					<view class="oper">
						<button open-type="share" plain="false" class="iconBtn" size="mini"></button>
						<text class="iconfont icon-fenxiang"></text>
						<text>分享</text>
					</view>
				</view>
				<view class="movie_series">
					<view class="movie_content">
						<text @tap=" infoTexttop=0">剧集|查看视频详情</text>
						<text>{{movie.vod_remarks}}</text>
					</view>
					<scroll-view class="movie_count" :scroll-x="true" :enable-flex="true" @click="setMovie" :scroll-into-view="'count'+countMovie">
						<template v-for="(item,index) in movie.movieCount" :key="index">
							<view class="count" :id="'count'+index">
								<text :class="{active_movie:item[1]==currentUrl}"
									:data-url="item[1]" :data-index="index">{{item[0].slice(1,-1)||item[0]}}</text>
							</view>
						</template>
					</scroll-view>
					<view  class="infotext" v-if="!infoTexttop" :style="{top:infoTexttop+'rpx',height:overHeight+'px'}">
						<view class="movie_name">
							<text>{{movie.vod_name}}</text>
							<text style="" @tap=" infoTexttop=1500">x</text>
						</view>
						<text>导演:{{movie.vod_director}}</text>
						<text>主演:{{movie.vod_actor}}</text>
						<text>上映时间:{{movie.vod_year}}</text>
						<text>地区:{{movie.vod_area}}</text>
						<text>详情:{{movie.vod_content}}</text>
					</view>
				</view>
				<SwperMovie title="其他" :tid="movie.type_id" :back="false" />
			</view>
			<view v-show="active==1"  class="comments">
				<scroll-view @scrolltolower="onBottom" lower-threshold="40" scroll-y="true" v-if="pinlunList.length!=0" :style="{height:overHeight+'px'}">
					<template v-for="item in pinlunList" :key="item._id">
							<PinItem :item="item" :refPan="$repPanel"/>
					</template>
				</scroll-view>
				<view class="" style="text-align: center;">
					<text v-show="pinlunList.length==0&&threshold.loading==false" style="color: #cccccc;">暂无评论</text>
					<Loading v-show="threshold.loading" />
				</view>
				<MsgPin :listHight="overHeight" ref="$repPanel"/>
			</view>
		
		</view>
		<view class="input" :style="{bottom:height+'px'}">
			<input type="text" class="text" v-model="text" :placeholder="placeholder"
				maxlength="-1" :adjust-position="false" @focus="focus" @blur="height=0" :focus="placeholder.includes('回复')">
			<text class="input_btn icon-zhifeiji iconfont" @tap="setPinlun"></text>
		</view>
	</view>
	<Model title="反馈信息" ref="$model" />
</template>

<script setup>
import { onLoad, onShareAppMessage, onUnload, onReachBottom,onReady} from "@dcloudio/uni-app"
import { getMovieApi } from "@/http/meApi/index.js"
import { ref, reactive, computed,onMounted ,provide,nextTick} from "vue"
import { getMovie } from "@/uilts/getMovieCount.js"
import Pinia from "@/store/index.js"
import { storeToRefs } from "pinia"
import SwperMovie from "@/components/swperMovie/swperMovie.vue"
import { formatTime } from "@/uilts/getMovieCount.js"
import usePinlun from "@/hooks/usePinlun.js"
import useComment from "@/hooks/useCommect.js"
import Model from "@/components/model/model.vue";
import MsgPin from "@/components/Lemsg/Lemsg.vue"
import PinItem from "@/components/PinItem/PinItem.vue"
const $model = ref(null)
const $repPanel =ref(null)
const { user,navBarHight} = storeToRefs(Pinia())
const movie = ref({})
const currentUrl = ref("")
const active = ref(0)
const pinlunList = ref([])
const text = ref("")
const { get, set, setHistory, getbanmuList, setbanmu,getToHis,setrepUser} = usePinlun()
const { isCommection, collection } = useComment()
const isCurrtime = ref(true)
const danmuList = ref([])
const height = ref(0)
const overHeight = ref(0)
const infoTexttop = ref(1500)
const placeholder = ref("发弹幕")
const threshold = reactive({
	isShowModel: false,
	isShow: false,
	loading: true,
	isColl: false,
	isEnd: false,
})
let timer = null
let currTime = ref(0)
let countMovie = 0

provide("repUser",repUser)

onLoad(async ({ id }) => {
    const res = await getToHis(+id)
	currTime.value = +(res[0]?.movie_time)||0;
	countMovie = +(res[0]?.count)||0;
	isCommection(id)
		.then(res => {
			threshold.isColl = res
		})
	getbanmuList(+id)
		.then(res => {
			danmuList.value = res[0]?.banmuList || []
		})
	inidMovie(id)
})

onUnload(() => {
	timer && clearTimeout(timer)
	setHistory({
		movie:movie.value,
		vod_id:movie.value.vod_id,
		movie_time:Math.floor(currTime.value),
		count: +countMovie
	})
})
onReady(()=>{
	
})
function setOver(){
	const sys =  uni.getSystemInfoSync()
	const query = uni.createSelectorQuery()
	let body = 0;
	query.select(".tagBody").boundingClientRect()
		.exec((res)=>{
			console.log(res)
			body = res[0].top
		})
	query.select(".input").boundingClientRect()
		.exec(res=>{
			overHeight.value = (sys.windowHeight - body) -  (sys.windowHeight - res[1].top)
		})
	
}
onShareAppMessage((res) => {
	return {
		title: movie.value.vod_name,
		imageUrl: movie.value.vod_pic,
	}
})

 function onBottom(){
	if (active != 1 || threshold.isEnd) return
	get(movie.value.vod_id, true)
		.then(res => {
			if (res.length < 10) {
				return threshold.isEnd = true
			}
			pinlunList.value.push(...res)
		})
}

function repUser(_id,name){
	placeholder.value= "回复"+name
	uni._id = _id
}

function focus(e) {
	height.value = e.target.height
}

function nextVideo() {
	let len = movie.value.movieCount.length-1
	if(countMovie>=len)return
	currentUrl.value = movie.value.movieCount[++countMovie][1]
}

function currentTime(e) {
	currTime.value = e.target.currentTime
}

async function getPinlun() {
	active.value = 1
	placeholder.value= "发评论"
	pinlunList.value = await get(movie.value.vod_id)
	threshold.loading = false
}
async function setPinlun() {
	if (active.value == 0) {
		let banmu = {
			text: text.value,
			color: '#ff0000',
			time: Math.ceil(+currTime.value)
		}
		danmuList.value.push(banmu)
		setbanmu(movie.value.vod_id, banmu)
	}
	if (active.value == 1) {
		if(placeholder.value.includes("回复")){
			setrepUser(uni._id,placeholder.value+':'+text.value)
			uni._id = null
			placeholder.value = "发评论"
		}else{
			pinlunList.value = await set(movie.value.vod_id, text.value)
		}
		
	}
	text.value = ""
}

function dowm() {
	uni.showToast({
		title: "暂不提供下载",
		icon: "none"
	})
}

async function setcollection() {
	let state = threshold.isColl ? 0 : 1
	const data = await collection(movie.value, movie.value.vod_id, state)
	threshold.isColl = data
}

function feedback() {
	threshold.isShowModel = true
	$model.value.show()
		.then(res => {
			uni.$cloud("feedback", { text: res, vod_id: movie.value.vod_id })
				.then(res => {
					uni.showToast({
						title: "反馈成功",
						icon: "none"
					})
				})
		})
		.catch(err => {
			console.log(err)
		})
		.finally(() => {
			threshold.isShowModel = false
		})
}

async function inidMovie(id) {
	try {
		uni.showLoading({title: "",mask: true})
		const {list: data} = await getMovieApi({ids: id})
		movie.value = data[0]
		let str = movie.value?.vod_url || movie.value?.vod_play_url
		let arr = getMovie(str)
		movie.value.movieCount = arr
		currentUrl.value = arr[+countMovie][1]
		let vidcon = wx.createVideoContext("video");
		console.log("currTime.value",currTime.value)
		vidcon.seek(currTime.value)
		uni.hideLoading()
		threshold.isShow = true
		nextTick(()=>{
			setOver()
		})
	} catch (e) {
		console.log("err", e)
		uni.showToast({
			title: "播放错误,2秒后返回主页",
			icon: "none"
		})
		uni.hideLoading()
		timer = setTimeout(() => {
			uni.switchTab({
				url: "/pages/index/index"
			})
		}, 2000)
	}
}

function setMovie(e) {
	const url = e.target.dataset.url
	currentUrl.value = url
	countMovie = +e.target.dataset.index
}

function videoErrorCallback(e) {
	uni.showToast({
		title: "网络有点慢，请耐心等待",
		icon: "none"
	})

}
</script>

<style scoped>
.body {
	margin-bottom: 130rpx;
	position: relative;
}

.input_btn {
	padding: 20rpx 0;
	padding-right: 25rpx;
	color: red;
	font-size: 80rpx;
}

.iconBtn {
	border: none;
	position: absolute;
	padding: 50rpx;
	z-index: 5;
}

.tagBody {
	margin: 25rpx 0;
	padding: 0 25rpx;
	
}

.tagBody>>>.title {
	font-weight: 500;
	color: #d5d5d5;
}

.myVideo {
	width: 750rpx;
	height: 450rpx;
	vertical-align: middle;
}

.tagTitle {
	height: 80rpx;
	width: 750rpx;
	padding-left: 25rpx;
	box-sizing: border-box;
}

.tag {
	font-size: 40rpx;
	font-weight: 500;
	padding: 0 25rpx;
	line-height: 80rpx;
}

.active {
	border-bottom: 2px solid red;
	color: red;
}

.movie_title {
	display: flex;
	flex-direction: column;
	margin: 20rpx 0;
}

.movie_name {
	font-size: 45rpx;
	font-weight: 500;
	color: red;
	display: flex;
	justify-content: space-between;
}

.movie_tag {
	font-size: 30rpx;
}

.movie_content {
	display: flex;
	justify-content: space-between;
	font-size: 32rpx;
}

.oper {
	display: flex;
	flex-direction: column;
	text-align: center;
	position: relative;
}

.oper .iconfont {
	font-size: 50rpx;
	color: red;
	font-weight: 700;
}

.movie_oper {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 30rpx 30rpx;
}

.movie_count {
	display: flex;
	height: 100rpx;
	margin: 25rpx 0;
}

.count text {
	display: block;
	width: 80rpx;
	height: 80rpx;
	background-color: #fff;
	color: black;
	font-size: 37rpx;
	margin: 10rpx 15rpx;
	line-height: 80rpx;
	text-align: center;
	border: 1px solid #d5d5d5;
}

.count .active_movie {
	color: red;
	border: 1px solid red;

}

.infotext {
	width: 750rpx;
	display: flex;
	position: absolute;
	left: 0;
	flex-direction: column;
	font-size: 30rpx;
	z-index: 5;
	background-color: #fff;
	margin-top: 105rpx;
	transition: all 0.5s;
	padding: 0 25rpx;
	box-sizing: border-box;
}

.oper .activeCollection {
	color: red;
}

.input {
	position: fixed;
	bottom: 0;
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: #fff;
	width: 750rpx;
	height: 130rpx;
	z-index: 9;
}

.text {
	border: 1px solid red;
	border-radius: 20rpx;
	width: 580rpx;
	padding: 10rpx;
	font-size: 33rpx;
}

.input_btn {
	color: red;
}

.comments>>>.loading {
	top: 70%;
}
.infomation{
	overflow: auto;
}
.comments{
	/* overflow: auto; */
}
</style>

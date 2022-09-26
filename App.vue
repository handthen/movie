<script setup>
	import {
		onNetworkChange
	} from "@/uilts/isNetWork.js"
	import {provide} from "vue"
	import {onLaunch} from "@dcloudio/uni-app"
	
	provide("moviePlay",moviePlay)
	onLaunch(()=>{
		wx.cloud.init({
			traceUser: true,
			env: "cloud1-6gszd9f08a0a2316"
		})
		onNetworkChange()
	})
	
	uni.addInterceptor("navigateTo",{
		invoke:(arg)=>{
			
		},
		success:(res)=>{
			console.log(res)
		}
	})
	
	function moviePlay(id){
		if(!id)return
		uni.navigateTo({
			url:"/pages/palyMovie/palyMovie?id="+id
		})
	}
</script>

<style>
	@import "@/static/iconfont/iconfont.css";
	page {
		/* background-color: black; */
	}

	.text {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		font-weight: 400;
		font-size: 35rpx;
	}
	::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		color: transparent;
		background-color: transparent;
	}

	/*每个页面公共css */
</style>

<template>
	<NavBar title="反馈"></NavBar>
		<view class="uni-textarea">
			<textarea class="textarea" v-model="value" placeholder="请描述遇到的问题"/>
			<button class="btn" @tap="feed">提交</button>
		</view>
</template>

<script setup>
	import {ref} from "vue"
	const value = ref("")
	
	function feed(){
	      if(!value.value)return
		uni.$cloud("feedback",{text:value.value})
		.then(res=>{
			uni.showToast({
			   title:"反馈成功",
			   icon:"none"
			})
			uni.switchTab({
				url:"/pages/me/me"
			})
		})
	}
</script>

<style>
	.textarea{
		border: 1px solid red;
		width: 650rpx;
		border-radius: 20rpx;
		padding: 20rpx;
		margin: auto;
		margin-top: 50rpx;
	}
  .btn{
	  margin-top: 250rpx;
	  width: 650rpx;
	  border-radius: 20rpx;
	  border:none;
	  height: 90rpx;
	  line-height: 90rpx;
	  background-image: linear-gradient(to right,red,#ff8011);
}
</style>

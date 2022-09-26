<template>
	<view class="black" v-if="showModel">
		<view class="model">
			<view class="title">
				<text>{{title}}</text>
			</view>
			<view class="body">
				<slot>
					<textarea class="textarea" v-model="value" maxlength="200" placeholder="请描述遇到的问题"/>
				</slot>
			</view>
			<view class="bottom">
				<button class="btn" plain="true" @tap="hide">取消</button>
				<button class="btn" plain="true" @tap="btnOk" style="color: red;">确认</button>
			</view>
		</view>
	</view>
	
</template>

<script setup>
	import {getCurrentInstance,onMounted,ref} from "vue"
	const value = ref("")
	const showModel = ref(false)
	let hide = null
	let btnOk = null
    const props = defineProps({
		title:{
			type:String,
			default:"提示"
		},
	})
	
   defineExpose({
	  show
    })
	//模态框组件内部
	//show 模态框显示方法
	function show(){
		//返回 promise对象
		return new Promise((res,rej)=>{
			showModel.value = true
			//取消按钮方法
			hide=()=>{
				rej("取消")
				showModel.value = false
			}
			//确定按钮方法
			btnOk=()=>{
				if(!value.value)return uni.showToast({title:"请输入内容",icon:"none"})
				res(value.value)
				showModel.value = false
			}
		})
	}
</script>

<style scoped>
  .model{
	  position: relative;
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%,-50%);
	  background-color: #fff;
	  width: 580rpx;
	  border-radius: 20rpx;
  }
  .btn{
	  padding: 0;
	  height: 70rpx;
	  width: 130rpx;
	  line-height: 70rpx;
	  border: none;
	  font-size: 40rpx;
  }
  .bot{
	  width: 290rpx;
  }
  .title{
	  text-align: center;
	  padding: 20rpx;
	  font-size: 40rpx;
  }
  .bottom{
	  display: flex;
	  justify-content: space-evenly;
	  padding: 40rpx 0;
  }
  .black{
  	background-color: rgb(0,0,0,0.5);
  	position: fixed;
  	top: 0;
  	z-index: 10;
  	width: 750rpx;
  	height: 100vh;
  }
  .body{
	  padding: 0 30rpx;
	  min-height: 200rpx;
  }
  .textarea{
  	border: 1rpx solid #c5c5c5;
  	width: 450rpx;
  	border-radius: 20rpx;
  	padding: 20rpx;
  	margin: auto;
	height: 180rpx;
	font-size: 30rpx;
  }
</style>

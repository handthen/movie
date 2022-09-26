<template>
	<view  @tap="toPlay">
		<image v-if="isImage" class="img-cover" src="@/static/images/image.png" mode="aspectFill" />
		<image :class="{'img-cover':!isImage,'loadImg':isImage}" @load.stop="isImage = false"
			:src="src" mode="aspectFill" />
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		inject
	} from "vue" 
	import image from "@/static/images/image.png"
	const isImage = ref(true)
	const moviePlay = inject("moviePlay")
	const props = defineProps({
		src:{
			type:String,
			default:image
		},
		vod_id:{
			type:Number,
			default:null
		},
		width:{
			type:Number,
			default:null
		},
		height:{
			type:Number,
			default:null
		}
	})
	
	function toPlay(){
		if(!props.vod_id)return
		moviePlay&&moviePlay(props.vod_id)
	}

</script>

<style scoped>
	.img-cover {
		width: 200rpx;
		height: 250rpx;
		vertical-align: middle;
	}

	.loadImg {
		width: 0;
		height: 0;
		vertical-align: middle;
	}
</style>

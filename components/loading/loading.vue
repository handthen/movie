<template>
	<view>
		<button loading="true" type="warn" plain="true" class="loading"></button>
	</view>
</template>

<script setup>

</script>

<style scoped>
.loading {
	    position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		border: none !important;
		z-index: 1000;
		font-size: 35rpx;
		color: red;
	}
</style>

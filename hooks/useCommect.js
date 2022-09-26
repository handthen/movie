
import {onMounted,computed} from "vue"
import Pinia from "@/store/index.js"
export default function useComment(){
	const pinia = Pinia()
	async function isCommection(id) {
		const {data,code} = await uni.$cloud("isCollection", {
			vod_id: +id
		})
		if (code == 200) return !!data
	}
	
	async function collection(movie,vod_id,state) {
		if (!pinia.user.openid) return uni.showToast({
			title: "操作失败",
			icon: "none"
		})
		const {
			data,
			code,
			msg
		} = await uni.$cloud("setCollection", {
			state,
			username: pinia.user.username,
			movie,
			vod_id
		})
		if (code != 200) return
		uni.showToast({
			title: msg || "",
			icon: "none"
		})
		return !!data
	}
	
	
	return {
		isCommection,
		collection
	}
}
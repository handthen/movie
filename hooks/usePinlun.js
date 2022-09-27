import {reactive} from "vue"
import Pinia from "@/store/index.js"
export default function usePinlun(){
	const pinia = Pinia()
	const page = reactive({
		pg:1,
		limit:10
	})
	async function getPinlunList(vod_id,next=false){
		next&&page.pg++
		const {data,code} =await uni.$cloud("getCommentList",{vod_id,pg:page.pg,limit:page.limit});
		if(code!=200)return []
		return data
	}
	
	async function setPinlun(vod_id,text){
		const {code} = await uni.$cloud("setComments",{vod_id,username:pinia.user.username,avatar:pinia.user.cloudAvatar,text})
		page.pg = 1
		if(code==200)uni.showToast({
			title:"已发送",
			icon:"none"
		})
		const newData = await getPinlunList(vod_id)
		return newData
	}
	
	async function setHistory({movie,vod_id,movie_time,count}){
		try {
			const data = await uni.$cloud("setHistory", {
				username: pinia.user.username,
				openid: pinia.user.openid,
				movie,
				vod_id,
				movie_time,
				count
			})
		} catch (e) {
			console.log(e)
		}
	}
	
	async function getToHis(vod_id){
		try {
			const {data} = await uni.$cloud("getTohis", {
				vod_id
			})
			return data
		} catch (e) {
			console.log(e)
		}
	}
	
	async function getbanmuList(vod_id){
		try {
			const {data,errMsg} = await uni.$cloud("getbanmuList", {vod_id})
			console.log(data,errMsg)
			return data
		} catch (e) {
			console.log(e)
		}
	}
	
	async function setbanmu(vod_id,banmu){
		try {
			const data = await uni.$cloud("setbanmu", {vod_id,banmu})
			console.log(data)
			return data
		} catch (e) {
			console.log(e)
		}
	}
	
	async function setrepUser(_id,text){
		try {
			const data = await uni.$cloud("setrepUser", {_id,text,avatar:pinia.user.cloudAvatar,username:pinia.user.username})
			console.log(data)
			return data
		} catch (e) {
			console.log(e)
		}
	}
	
	return {
		get:getPinlunList,
		set:setPinlun,
		setHistory,
		getbanmuList,
		setbanmu,
		getToHis,
		setrepUser
	}
}
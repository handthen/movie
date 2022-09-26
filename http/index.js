import {
	isTabBar
} from "@/uilts/isNetWork.js"


const typeMap = {
	9699423: 24,
	9699424: 25,
	9699425: 26,
	1310800: 1,
	65602: 2,
	65603: 11,
	24: 9699423,
	25: 9699424,
	26: 9699425,
	11: 310800,
	2: 65602,
	11: 65603
}
const ServerUrl = []
const baseUrlBack = "https://taopianapi.com/home/cjapi/as"
const baseUrl = "https://jyzyapi.com/provide/vod/from/jinyingm3u8/at/json" //新地址

let currentBase = baseUrl
export let wxTask = null //请求中断对象
export default async (option = {
	method: "get",
	data: {},
	header: {
		'content-type': 'application/x-www-form-urlencoded'
	}
}) => {
	const {
		Pinia
	} = require("../store/index.js")
	const store = Pinia()
	if (!store.isNetwork) {
		uni.showToast({
			icon: "none",
			title: "网络似乎断开了"
		})
		// if (!isTabBar(getCurrentPages().at(-1).route)) {
		//     uni.redirectTo({
		//         url: "/pages/Error/Error?path=" + getCurrentPages().at(-1).route
		//     })
		// }
		return Promise.reject("网络错误")
	}
	return new Promise((resolve, reject) => {
		wxTask = uni.request({
			url: currentBase + (currentBase == baseUrl ? "" : option.url),
			method: option.method,
			data: {
				...option.data,
				[currentBase == baseUrl ? "limit" : "ps"]: option.data?.limit || 20,
				cid:typeMap[option.data.tid]||option.data.t||0,
				t:option.data.tid||option.data.t||0
			},
			header: {
				...option.header,
			},
			timeout: 6000,

			success: (res) => {
				console.log("res", res)
				if (res.statusCode >= 200 && res.statusCode <= 300) {
					if (res.data.code == 1 || res.data.code == 200) {
						resolve(apder(res.data))
					} else {
						uni.showToast({
							icon: "none",
							title: "获取失败",
							mask: true
						})
						return reject(res)
					}
				} else {
					reject(res)
				}
			},
			fail: (e) => {
				console.log("aperr", e)
				if (e.errMsg?.indexOf("abort") != -1) {
					return
				}
				let msg = null
				if (e.errMsg?.indexOf("timeout") != -1) {
					msg = "请求超时"
				}
				uni.showToast({
					icon: "none",
					title: msg || "服务器开小差了",
					mask: true
				})
			},
			complete: () => {
				wxTask = null
			}
		})
	})

}


function apder(data) {
	if (!data.list) {
		data.list = data.data
	}
	data.list = data.list?.map(v => {
		return {
			...v,
			daoyan: v.vod_director || "",
			zhuyan: v.vod_actor || "",
		}
	})
	data.class = data.class?.map(v => {
		return {
			id: v.type_id || "",
			name: v.type_name || "",
			type_id: v.id || "",
			type_name: v.name || "",
			...v,
		}
	})
	return data
}

export const UrlToBack = (i) => {
	wxTask && wxTask.abort()
	currentBase = baseUrlBack
}

export const is = ()=>{
	if(currentBase == baseUrlBack)return false
	return true
}

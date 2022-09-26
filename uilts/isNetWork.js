import Pinia from "@/store/index.js"
//监听网络
export function onNetworkChange() {
	const Store  = Pinia()
	uni.getNetworkType({
		success: function(res) {
			const networkType = res.networkType
			console.log(networkType)
			if (networkType != "none") {
				 return Store.setNetwork(true)
			}
			uni.showToast({
				icon: "none",
				title: "网络错误,请检查网络连接"
			})
		}
	})

	uni.onNetworkStatusChange((result) => {
		const routeList = getCurrentPages()
		if (!result.isConnected) {
			Store.setNetwork(false)
			uni.showToast({
				title: "服务器开小差了哦!",
				icon: "none"
			})
		} else {
			uni.showToast({
				title: "网络已连接",
				icon: "none"
			})
			Store.setNetwork(true)
		}

	})
}


export function isTabBar(path) {
	if(!path)return true
	const TabBar = ["pages/index/index", "pages/classif/classif", "pages/me/me"];
	return TabBar.includes(path)
}

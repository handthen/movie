export default function usepanel(){
	function getpanel() {
		const data = JSON.parse(uni.getStorageSync("panel") || "{}") || {}
		return Object.keys(data)
	}

	function setpanel(value) {
		let panel = JSON.parse(uni.getStorageSync("panel") || "{}")|| {}
		panel[value] = value
		uni.setStorageSync("panel", JSON.stringify(panel))
	}
	
	function clearpanel(){
		uni.clearStorageSync()
	}

	return {
		getpanel,
		setpanel,
		clearpanel
	}
}

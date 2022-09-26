import {
	is
} from "@/http/index.js"

export const getMovie = function(str) {
	if (!str) return []
	let b = is() ? "#" : "\r"
	let arr = str.split(b).filter(v => v.includes(".m3u8"))
	let arrCount = arr.map(v => v.split("$"))
	return arrCount
}

export function todate(time) {
	const date = new Date(time)
	return date.getFullYear() + "/" + (+date.getMonth() + 1) + "/" + date.getDate() + " " + date.getHours() + "." + date
		.getMinutes() + "." + date.getSeconds()
}


/** * 时间转换 * @params {String | Number} 时间字符串或者时间戳 */
export const formatTime = (
	time) => { // 拿到当前的时间戳（毫秒) -- 转换为秒 
	let currentTime = new Date() 
	let currentTimestamp = parseInt(currentTime.getTime() / 1000)
	// 传进来的时间戳（毫秒) 
	let t = new Date(time) 
	let oldTimestamp = parseInt(t.getTime() / 1000) // 年 
	let oldY = t.getFullYear() // 月 
	let oldM = t.getMonth() + 1 // 日 
	let oldD = t.getDate() // 时 
	let oldH = t.getHours() // 分 
	let oldi = t.getMinutes() // 秒
	let olds = t.getSeconds() // 相隔多少秒
	let timestampDiff = currentTimestamp - oldTimestamp 
	if (timestampDiff < 60) {
		// 一分钟以内 
		return "刚刚"
	}
	if (timestampDiff < 60 * 60) { // 一小时以内
		return Math.floor(timestampDiff / 60) + '分钟前'
	} // 今天的时间
	if (oldY === currentTime.getFullYear() && oldM === (currentTime.getMonth() + 1) && oldD === currentTime
		.getDate()) {
		// 10:22 
		return `${zeroize(oldH)}:${zeroize(oldi)}`
	} // 剩下的，就是昨天及以前的数据 
	return `${oldY}-${zeroize(oldM)}-${zeroize(oldD)}` // 补0 
	
	function zeroize(num) {
		return num < 10 ? "0" + num : num
	}
}

export function formMovieTime(miu){
	       if(miu<60){
	         return '00:00:'+miu
	       }
	       let s = 0;
	       let m = 0;
	       let h = 0;
	       h=parseInt(miu/60/60)
	       m=parseInt(miu/60)
	       s=miu-(m*60)-(h*60*60)
	       h=h<10?'0'+h:h;
	       m = m<10?'0'+m:m;
	       s = s<10?'0'+s:s
	       return h+":"+m+":"+s
}


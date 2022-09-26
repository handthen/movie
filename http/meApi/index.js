import request from "../index.js"
// h:采集时间范围，cid:类型id,pg:页数,ps:数量,ac:行为,wd:片名关键字,ids:影片id

export const getDiffuseApi = (data = {}) => request({
	url: "/max/vod/json",
	data: {
		ac:"detail",
		pg: 1,
		limit: 6,
		h: 332,
		...data
	}
})

export const getMovieApi = (data = {}) => request({
	url: "/max/vod/json",
	data:{
		ac:"detail",
		...data
	}

})

export const getSearchApi = (data = {}) => request({
	url: "/max/vod/json",
	data:{
		ac:"detail",
		...data
	}
})
export const getFenleiApi = (data = {}) => request({
	url: "/max/vod/json",
	data: {
		ac:"detail",
		pg: 1,
		limit: 15,
		...data
	}
})
export const getMovieType = (data = {})=>request({
	url:"/ct/vod/json",
	data:{
		ac:"detail"
	}
})

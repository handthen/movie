// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
	env: "cloud1-6gszd9f08a0a2316"
})
const db = cloud.database()

const FTYPE = {
	setCollection,
	getUser,
	isCollection,
	setHistory,
	getHistory,
	getTohis,
	getCollection,
	getCommentList,
	setComments,
	getbanmuList,
	setbanmu,
	clearHistory,
	feedback,
	setrepUser
}

Object.freeze(FTYPE)

// 云函数入口函数
exports.main = async (event, context) => {
	if (event.type) {
		const data = FTYPE[event.type] && FTYPE[event.type](event);
		if (data) return data
		return {
			code: 1005,
			errMsg: "请传递正确的参数"
		}
	}



}


function getUser() {
	const wxContext = cloud.getWXContext()
	return {
		openid: wxContext.OPENID,
		appid: wxContext.APPID,
		unionid: wxContext.UNIONID,
	}
}

async function setCollection(event) {
	const {
		userInfo,
		username,
		movie,
		vod_id,
		state
	} = event;
	if (state) {
		const result = await db.collection("movie_colection").add({
			data: {
				openid: userInfo.openId,
				username,
				movie,
				time: Date.now(),
				vod_id
			}
		})

		return {
			code: 200,
			msg: "已收藏",
			data: 1
		}

	} else {
		const {
			data,
			errMsg
		} = await db.collection("movie_colection").where({
			vod_id: vod_id
		}).remove()

		return {
			code: 200,
			msg: "已取消",
			data: 0
		}
	}
}
async function getCollection(event) {
	const {
		pg,
		limit,
		userInfo
	} = event;
	const pageLimit = (pg - 1) * limit
	const list = await db.collection('movie_colection')
		.where({
			openid: userInfo.openId
		})
		.orderBy('time', 'desc')
		.skip(pageLimit)
		.limit(limit)
		.get()
	const {
		data,
		errMsg
	} = list
	console.log("list", list)
	return {
		code: 200,
		data,
		errMsg
	}
}

async function isCollection(event) {
	const {
		vod_id
	} = event;
	const _ = db.command
	const {
		data,
		errMsg
	} = await db.collection("movie_colection").where({
		vod_id: _.eq(vod_id)
	}).get()
	console.log(vod_id, data)
	if (errMsg.indexOf("ok") == -1) return {
		errMsg
	}
	if (data.length == 0) {
		return {
			code: 200,
			data: 0
		}
	}
	return {
		code: 200,
		data: 1
	}
}

async function setHistory(event) {
	try {
		const {
			userInfo,
			username,
			movie,
			vod_id,
			movie_time,
			count
		} = event;
		const {
			data
		} = await isHistory(vod_id)

		console.log("isss", data)
		if (!data) {
			const result = await db.collection("movie_historical").add({
				data: {
					openid:userInfo.openId,
					username,
					movie,
					time: Date.now(),
					vod_id,
					movie_time,
					count
				}
			})
		} else {
			const result = await db.collection("movie_historical").where({
					vod_id: vod_id
				})
				.update({
					data: {
						time: Date.now(),
						movie_time,
						count
					}
				})
		}
	} catch (e) {
		console.log(e)
		return {
			code: 500
		}
	}

	return {
		code: 200
	}

}
async function getTohis(event){
	const {vod_id,userInfo} =event ;
	const {data,errMsg} = await db.collection('movie_historical').where({
		openid:userInfo.openId,
		vod_id
	})
	.field({
		count:true,
		movie_time:true
	})
	.get()
	
	return {
		code:200,
		data,
		errMsg
	}
	
}

async function clearHistory(event){
	const {userInfo,vod_id} = event
	let option = {}
	vod_id&&(option.vod_id = vod_id)
	const data = await db.collection('movie_historical')
	.where({
	  openid:userInfo.openId,
	  ...option
	})
	.remove()
	
	return {
		code:200,
	}
}

async function isHistory(vod_id) {
	const {
		data,
		errMsg
	} = await db.collection("movie_historical").where({
		vod_id: vod_id
	}).get()
	if (errMsg.indexOf("ok") == -1) return {
		errMsg
	}
	if (data.length == 0) {
		return {
			code: 200,
			data: 0
		}
	}
	return {
		code: 200,
		data: 1
	}
}

async function getHistory(event) {
	const {
		pg,
		limit,
		userInfo
	} = event;
	const pageLimit = (pg - 1) * limit
	const list = await db.collection('movie_historical')
		.where({
			openid: userInfo.openId
		})
		.orderBy('time', 'desc')
		.skip(pageLimit)
		.limit(limit)
		.get()
	const {
		data,
		errMsg
	} = list
	console.log("list", list)
	return {
		code: 200,
		data,
		errMsg
	}

}

async function setComments(event) {
	const {
		avatar,
		username,
		text,
		vod_id,
		userInfo
	} = event;
	const result = await db.collection("movie_comments").add({
		data: {
			avatar,
			username,
			text,
			time: Date.now(),
			openid: userInfo.openId,
			vod_id,
			reply:[]
		}
	})
	return {
		code: 200
	}
}

async function getCommentList(event) {
	const {
		vod_id,
		pg,
		limit
	} = event;
	const pageLimit = (pg - 1) * limit
	try {
		const list =await db.collection("movie_comments").where({
				vod_id: vod_id
			})
			.orderBy('time', 'desc')
			.skip(pageLimit)
			.limit(limit)
			.get()
		const {
			data,
			errMsg
		} = list
		return {
			code: 200,
			data,
			errMsg
		}
	} catch (e) {
		console.log(e)
		return {
			code: 500,
			errMsg
		}
	}
}

async function getbanmuList(event){
	const {vod_id} = event;
	const {data,errMsg} = await db.collection("movie_barrage").where({
		vod_id:vod_id
	})
	.field({
		banmuList:true
	})
	.get()
	return {
		data,
		errMsg
	}
}

async function setbanmu(event){
	const {userInfo,vod_id,banmu} = event;
	const _ = db.command
	let result= {code:500}
	const {data} = await db.collection("movie_barrage").where({
		vod_id:+vod_id
	}).get()
	if(data.length==0){
		 result = await db.collection("movie_barrage").add({
			data:{
				vod_id,
				banmuList:[{
					...banmu,
					openid:userInfo.openId
				}]
			}
		})
		
	}else{
		 result = await db.collection("movie_barrage").where({
			vod_id:+vod_id
		}).update({
			data:{
			banmuList:_.push({...banmu,openid:userInfo.openId})
		}
		})
		
	}
	return {code:200}
}


async function feedback(event){
	const {userInfo,text} = event;
	const data = await db.collection("movie_feedback").add({
		data:{
			time:Date.now(),
			text,
			openid:userInfo.openId
		}
	})
	
	return {
		code:200,
		data
	}
}

async function setrepUser(event){
	const {_id,text,username,userInfo,avatar} = event;
	const _ = db.command
	const data = await db.collection("movie_comments").doc(_id)
	.update({
		data:{
			reply:_.push({
				username,
				text,
				time:Date.now(),
				openid:userInfo.openId,
				avatar
			})
		}
	})
	
	return {
		code:200,
		data
	}
}
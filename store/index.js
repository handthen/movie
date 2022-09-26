import {defineStore} from "pinia"
const defauleUrl =
			"https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0"
const Pinia = defineStore("myPinia",{
	state:()=>({
		isNetwork:true,
		user:{
			avatarUrl:uni.getStorageSync("avatarUrl")||defauleUrl,
			cloudAvatar:uni.getStorageSync("cloudAvatar")||defauleUrl,
			username:uni.getStorageSync("username")||"微信用户",
			openid:uni.getStorageSync("openid")||""
		},
		navBarHight:0,
		classif:null
	}),
	getters:{
		getClass(state){
			const classif = state.classif
			state.classif = null
			return classif
		}
	},
	actions:{
		setNetwork(net){
			this.isNetwork = net
		},
		setuser(userinfo){
			this.$patch({
				user:{
					...this.user,
					...userinfo
				}
			})
		
		}
	}
})

export default Pinia
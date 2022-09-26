export default function cloudFunc(FuncName, options,cloudName="movie") {
	console.log(options)
	return new Promise((resolve, reject) => {
		wx.cloud.callFunction({
				name: cloudName,
				data: {
					type: FuncName,
					...options
				}
			})
		 .then(({
				result
			}) => {
				resolve(result)
			}, reject)
	})
}

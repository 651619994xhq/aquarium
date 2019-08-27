class $http {
    post(url,param={}){
        return new Promise((resolve, reject)=>{
            wx.request({
                url: 'http://fat01-common-task-manager-service.zykj.com//manage/scope/login/getUserInfo', //仅为示例，并非真实的接口地址
                data: param,
                header: {
                    'content-type': 'application/json', // 默认值
                    'token':'',
                },
                method:'POST',
                success (res) {
                    if(res.code===1){
                        resolve(res.data);
                        return;
                    };
                    reject(res.msg);

                },
                fail(msg){
                    reject(msg)
                }
            })

        })

    }

    get(url,param={}){
        return new Promise((resolve, reject)=>{
            wx.request({
                url: 'test.php', //仅为示例，并非真实的接口地址
                data: param,
                header: {
                    'content-type': 'application/json', // 默认值
                    'token':'',
                },
                method:'GET',
                success (res) {
                    if(res.code===1){
                        resolve(res.data);
                        return;
                    };
                    reject(res.msg||'系统错误');

                },
                fail(msg){
                    reject(msg||'系统错误')
                }
            })

        })

    }

}

let _http =new $http();

export const http=_http;



// loading加载提示
export const showLoading = () => {
    console.log('showLoading is run')
    return new Promise((resolve, reject) => {
        wx.showLoading({
            title: '加载中...',
            mask: true,
            success (res) {
                console.log('显示loading')
                resolve(res)
            },
            fail (err) {
                reject(err)
            }
        })
    })
}

// 关闭loading
export const hideLoading = () => {
    return new Promise((resolve) => {
        wx.hideLoading()
        console.log('隐藏loading')
        resolve()
    })
}

class $http {
    post(url,param={}){
        return new Promise((resolve, reject)=>{
            wx.request({
                url: 'test.php', //仅为示例，并非真实的接口地址
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
                    reject(res.msg);

                },
                fail(msg){
                    reject(msg)
                }
            })

        })

    }

}

let http =new $http();

export default http
//logs.js
const util = require('../../utils/util.js')
//index.js
//获取应用实例
const app = getApp()

Page({
    data: {

    },
    onLoad: function (options) {
        console.log('login page is load')
        app.getUserInfo().then(()=>{
            wx.switchTab({
                url:'/pages/home/home'
            })
        }).catch((msg)=>{
            console.log(msg)
            wx.showToast({
              title: '登录失败'
            })
        });
    }
})

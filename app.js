//app.js
import {login} from './utils/service';
//这里是让小程序 支持 async await 语法的
const regeneratorRuntime = require('./utils/runtime');
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)


  },
  getUserInfo(){
    // 登录
    return new Promise((resolve, reject)=>{
      wx.login({
        success: res => {
          this.globalData.code=res.code
          // 获取用户信息
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  success: async (res) => {
                    // 可以将 res 发送给后台解码出 unionId
                    this.globalData.userInfo = res.userInfo;
                    let [err,data]=await login({
                      code:this.globalData.code,
                      user_info:JSON.stringify(res.userInfo)
                    });
                    if(err!=null){reject('接口调用失败');return };
                    this.globalData.token=data.token;
                    resolve();
                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    // if (this.userInfoReadyCallback) {
                    //   this.userInfoReadyCallback(res)
                    // }
                  }
                })
              }
            }
          })

        }
      })
    })

  },
  globalData: {
    userInfo: null,
    code:'',
    list:[],//
    token:'',
  }
})

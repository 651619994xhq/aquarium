//logs.js
const util = require('../../utils/util.js')

Page({
    data: {

    },
    onLoad: function () {
        console.log('test page is load')
        // wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
    },
    onPullDownRefresh(){
     console.log('onPullDownRefresh is run');
     setTimeout(()=>{
         wx.stopPullDownRefresh()
     },3000)
    }
})

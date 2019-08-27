//logs.js
const util = require('../../utils/util.js')

Page({
    data: {

    },
    onLoad: function () {
        console.log('mine page is load')
    },
    onShow(){
        //页面显示
        if(typeof this.getTabBar === 'function' && this.getTabBar()){
            this.getTabBar().setData({
                selected:1
            })
        }
    },
})

//logs.js
const util = require('../../utils/util.js');
const regeneratorRuntime = require('../../utils/runtime');
import {getMyLabel,getIndexInfo} from '../../utils/service'
import {hideLoading, showLoading} from '../../utils/http';
Page({
    data: {
        test:'123',
        num:10,
        navData:[
            {
                text: '关注'
            },
            {
                text: '推荐'
            },
            {
                text: '情感'
            },
            {
                text: '职场'
            },
            {
                text: '育儿'
            },
            {
                text: '纠纷'
            },
            {
                text: '青葱'
            },
            {
                text: '上课'
            },
            {
                text: '下课'
            }
        ],
        currentTab: 0,
        navScrollLeft: 0,
        windowHeight:0,
        windowWidth:0,
        list:[],
        dd:'',
        hidden:false,
        page: 1,
        size: 20,
        hasMore:true,
        hasRefesh:false
    },
    onLoad: function () {
        this.init();
    },
    async init(){
        await showLoading();
        wx.getSystemInfo({
            success: async (res)=>{
                // 高度,宽度 单位为px
                this.setData({
                    windowHeight: res.windowHeight,
                    windowWidth: res.windowWidth
                })
            }
        });
        let [err,data]=await getMyLabel({}); //获取头部标签信息
        if(err!=null){wx.showToast({title: err})};
        await this.getPageInfoWithParam({});
        await hideLoading();
    },
    //获取页面信息 根据参数
    async getPageInfoWithParam(param){
        let [err,data]=await getIndexInfo(param);
        if(err!=null){wx.showToast({title: err})};
    },
    onReady(){
      //页面渲染完成
    },
    onShow(){
      //页面显示
    },
    onHide(){
      //页面影藏
    },
    onUnload(){
      //页面关闭
    },
    //点击事件处理
    bindViewTap(){

    },
    //加载更多
    loadMore(){

    },
    //刷新
    refesh(e){

    },
    switchNav(event){
        var cur = event.currentTarget.dataset.current;
        console.log('cur==>',cur);

        //每个tab选项宽度占1/6
        var singleNavWidth = this.data.windowWidth / 6;
        //tab选项居中
        this.setData({
            navScrollLeft: (cur - 2) * singleNavWidth
        })
        // console.log(this.navScrollLeft)
        if (this.data.currentTab == cur) {
            return false;
        } else {
            this.setData({
                currentTab: cur
            })
        }
    },
    changeFn(e){
        console.log('e==>',e.detail);
    }
})

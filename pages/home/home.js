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
            // {
            //     text: '情感'
            // },
            // {
            //     text: '职场'
            // },
            // {
            //     text: '育儿'
            // },
            // {
            //     text: '纠纷'
            // },
            // {
            //     text: '青葱'
            // },
            // {
            //     text: '上课'
            // },
            // {
            //     text: '下课'
            // }
        ],
        selectList:[
            {
                text:'鉴赏讨论',
                select:false
            },
            {
                text:'交易信息',
                select:false
            },
            {
                text:'求助达人',
                select:false
            }
        ],
        currentTab: 0,
        navScrollLeft: 0,
        windowHeight:0,
        windowWidth:0,
        scrollHeight:0,
        page: 1,
        size: 20,
        hasMore:true,
        hasRefesh:false,
        isShow:false,
        list:[], //
    },
    onLoad: function () {
        this.init();
    },
    calScrollviewHeight(){
        let that=this;
        var obj = wx.createSelectorQuery();
            obj.select('.fill-bank').boundingClientRect();
            obj.exec(function (rect) {
                //这里减去顶部的高度和底部的高度
                that.setData({
                    scrollHeight:that.data.windowHeight-rect[0].height-64
                })
                console.log('windowHeight',that.data.windowHeight,' rect-height==>',rect[0].height,' scollHeight==>',that.data.scrollHeight)
                that.setData({
                    isShow:true
                })
            }) ;

    },
    async init(){
        //这个是小程序的bug
        wx.setBackgroundColor({
            backgroundColor: '#ffffff', // 窗口的背景色为白色
        });
        await showLoading();
        //获取信息
        wx.getSystemInfo({
            success: async (res)=>{
                // 高度,宽度 单位为px
                this.setData({windowHeight: res.windowHeight,windowWidth: res.windowWidth})
                this.calScrollviewHeight();
            }
        });
        let [err,data]=await getMyLabel({}); //获取头部标签信息
        if(err!=null){wx.showToast({title: '系统错误'})};
        this.setData({
            navData:[...this.data.navData,...data]
        });
        await this.getPageInfoWithParam({});
        await hideLoading();
    },
    //获取页面信息 根据参数
    async getPageInfoWithParam(param){
        let [err,data]=await getIndexInfo(param);
        if(err!=null){wx.showToast({title:'系统错误'})};
        console.log('param==>',data);
        this.setData({
            list:[...data.data]
        })
        console.log(JSON.stringify(this.data.list[0]))


    },
    onReady(){
      //页面渲染完成
    },
    onShow(){
      //页面显示
        if(typeof this.getTabBar === 'function' && this.getTabBar()){
            this.getTabBar().setData({
               selected:0
            })
        }
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
        console.log('loadMore is run')
        this.setData({
            hasMore:true,
            hasRefesh:false,
        })
    },
    //刷新
    refesh(e){
        console.log('refesh is run')
        this.setData({
            hasMore:false,
            hasRefesh:true,
        })
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
    handleSelect(e){
        console.log('e==>',e.currentTarget.dataset.current)
        let index=e.currentTarget.dataset.current;
        this.data.selectList[index].select=!this.data.selectList[index].select;
        this.setData({
            selectList:[...this.data.selectList]
        })
    },
    handleSelectAll() {
        console.log('handelSelect is all')
        this.setData({
            selectList:[
                {
                    text:'鉴赏讨论',
                    select:true
                },
                {
                    text:'交易信息',
                    select:true
                },
                {
                    text:'求助达人',
                    select:true
                }
            ]
        })
    }
    ,
    onPullDownRefresh(e){
     console.log('onPullDownRefresh',e)
    },
    changeFn(e){
        console.log('e==>',e.detail);
    }
})

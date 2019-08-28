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
                name: '关注',
                id:'fllow'
            },
            {
                name: '推荐',
                id:'0'
            },
        ],
        selectList:[
            {
                text:'全部',
                select:true,
                type:null,
            },
            {
                text:'鉴赏讨论',
                select:false,
                type:1,
            },
            {
                text:'交易信息',
                select:false,
                type:2,
            },
            {
                text:'求助达人',
                select:false,
                type:3,
            }
        ],
        selectType:null,
        selectIndex:0,
        selectId:'fllow',
        currentTab: 0,
        windowHeight:0,
        windowWidth:0,
        scrollHeight:0,
        currentPage: 1,
        hasMore:false,
        hasRefesh:false,
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
        let [err,data]=await getMyLabel(); //获取头部标签信息
        if(err!=null){wx.showToast({title: '系统错误'})};
        this.setData({
            navData:[{name: '关注', id:'fllow'}, {name: '推荐', id:'0'},...data]
        });
        await this.getPageInfoWithParam({page:this.data.currentPage,label:this.data.navData[this.data.currentTab]['text']});
        await hideLoading();
    },
    //获取页面信息 根据参数
    async getPageInfoWithParam(param={}){
        await showLoading();
        let [err,data]=await getIndexInfo({...param,label: this.data.selectId,type:this.data.selectType});
        if(err!=null){wx.showToast({title:'系统错误'});hideLoading();return };
        this.setData({
            list:[...data.data]
        })
        await hideLoading();
    },
    onReady(){
      //页面渲染完成
    },
    async onShow(){
      //页面显示
        if(typeof this.getTabBar === 'function' && this.getTabBar()){
            this.getTabBar().setData({
               selected:0
            })
        };
        let [err,data]=await getMyLabel(); //获取头部标签信息
        if(err!=null){wx.showToast({title: '系统错误'})};
        this.setData({
            navData:[{name: '关注', id:'fllow'}, {name: '推荐', id:'0'},...data]
        });
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
    loadMore:util.throttle(async function(){
        await showLoading();
        this.setData({
            hasMore:true,
            hasRefesh:false,
        });
        let [err,data]=await getIndexInfo({page:this.data.currentPage+1});
        if(err!=null){wx.showToast('系统异常'); hideLoading();return ;};
        if(data.data.length==0){
            setTimeout(async ()=>{
                this.setData({
                    hasMore:false
                })
                await hideLoading();
            },1000)
            return ;
        };
        this.setData({
            currentPage:this.data.currentPage+1,
            list:[...this.data.list,...data.data],
            hasMore:false,
            hasRefesh:false
        });
        await hideLoading();
    }),
    //刷新
    refesh:util.throttle(async function(){
        await showLoading();
        this.setData({
            hasMore:false,
            hasRefesh:true,
        });
        let [err,data]=await getIndexInfo({page:1});
        if(JSON.stringify(data.data)==JSON.stringify(this.data.list)){
            setTimeout(async ()=>{
                this.setData({hasMore:false,hasRefesh:false,});
                await hideLoading();
            },1000);
           return ;
        };
        if(err!=null){wx.showToast('系统异常'); hideLoading();return ;};
        setTimeout(async ()=>{
            this.setData({
                currentPage:1,
                list:[...data.data],
                hasMore:false,
                hasRefesh:false
            });
            await hideLoading();
        },2000)
    }),
    async switchNav(event){
        await showLoading();
        var cur = event.currentTarget.dataset.current;
        //每个tab选项宽度占1/6
        var singleNavWidth = this.data.windowWidth / 6;
        //tab选项居中
        this.setData({
            navScrollLeft: (cur - 2) * singleNavWidth
        });
        // console.log(this.navScrollLeft)
        if (this.data.currentTab == cur) {
            await hideLoading();
            return false;
        } else {
            this.setData({
                currentTab: cur,
                selectId:this.data.navData[cur]['id']
            })
        };
        await this.getPageInfoWithParam({page:1});
        await hideLoading();
    },
    async handleSelect(e){
        await showLoading();
        console.log('e==>',e.currentTarget.dataset.current)
        let index=e.currentTarget.dataset.current;
        this.data.selectList[this.data.selectIndex].select=false;
        this.data.selectList[index].select=!this.data.selectList[index].select;
        let selectType=this.data.selectList[index].type,
        selectIndex=index;
        this.setData({
            selectList:[...this.data.selectList],
            selectType,
            selectIndex
        });
        await this.getPageInfoWithParam({page:1});
    },
    onPullDownRefresh(e){
     console.log('onPullDownRefresh',e)
    },
    changeFn(e){
        console.log('e==>',e.detail);
    }
})

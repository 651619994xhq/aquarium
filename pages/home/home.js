//logs.js
const util = require('../../utils/util.js');
const regeneratorRuntime = require('../../utils/runtime');
import {getMyLabel,getIndexInfo} from '../../utils/service'
import {hideLoading, showLoading} from '../../utils/http';
Page({
    data: {
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
        currentPage: 1,
        hasMore:false,
        hasRefesh:false,
        backTop:false,
        list:[], //

    },
    onLoad() {
        this.init();
    },
    async init(){
        //这个是小程序的bug
        wx.setBackgroundColor({
            backgroundColor: '#ffffff', // 窗口的背景色为白色
        });
        await this.getMyLikeLabel();
        await this.getPageInfoWithParam();
    },
    //获取我喜欢的标签
    async getMyLikeLabel(){
        await showLoading();
        let [err,data]=await getMyLabel(); //获取头部标签信息
        if(err!=null){wx.showToast({title: '系统错误'});await hideLoading();return false};
        this.setData({ navData:[{name: '关注', id:'fllow'}, {name: '推荐', id:'0'},...data]});
        await hideLoading();
        return true;
    },
    //获取页面信息 根据参数
    async getPageInfoWithParam(){
        await showLoading();
        let [err,data]=await getIndexInfo({label: this.data.selectId,type:this.data.selectType,page:this.data.currentPage});
        if(err!=null){wx.showToast({title:'系统错误'});await hideLoading();return false};
        this.setData({list:[...data.data]});
        await hideLoading();
        return true;
    },
    async onShow(){
      //页面显示
        if(typeof this.getTabBar === 'function' && this.getTabBar()){
            this.getTabBar().setData({
               selected:0
            })
        };
        await this.getMyLikeLabel();
    },
    async switchNav(event){
        await showLoading();
        var cur = event.currentTarget.dataset.current;
        //每个tab选项宽度占1/6
        var singleNavWidth = this.data.windowWidth / 6;
        //tab选项居中
        this.setData({navScrollLeft: (cur - 2) * singleNavWidth});
        if (this.data.currentTab == cur) {
            await hideLoading();
            return false;
        };
        this.setData({currentTab: cur,selectId:this.data.navData[cur]['id'],currentPage:1})
        await this.getPageInfoWithParam();
        await hideLoading();
    },
    async handleSelect(e){
        let index=e.currentTarget.dataset.current;
        if(index==this.data.selectIndex){
            return ;
        };
        await showLoading();
        this.data.selectList[this.data.selectIndex].select=false;
        this.data.selectList[index].select=!this.data.selectList[index].select;
        let selectType=this.data.selectList[index].type,
        selectIndex=index;
        this.setData({
            selectList:[...this.data.selectList],
            selectType,
            selectIndex,
            currentPage:1
        });
        await this.getPageInfoWithParam();
    },
    async onReachBottom(){
        await showLoading();
        this.setData({
            hasMore:true,
            hasRefesh:false,
        });
        let [err,data]=await getIndexInfo({page:this.data.currentPage+1,label: this.data.selectId,type:this.data.selectType,});
        if(err!=null){wx.showToast('系统异常'); hideLoading();return ;};
        if(data.data.length==0){
                this.setData({
                    hasMore:false
                })
                await hideLoading();
            return ;
        };
        this.setData({
            currentPage:this.data.currentPage+1,
            list:[...this.data.list,...data.data],
            hasMore:false,
            hasRefesh:false
        });
        await hideLoading();
    },
    async onPullDownRefresh(){
        await showLoading();
        this.setData({
            hasMore:false,
            hasRefesh:true,
        });
        let [err,data]=await getIndexInfo({page:1,label: this.data.selectId,type:this.data.selectType});
        if(JSON.stringify(data.data)==JSON.stringify(this.data.list)){
                this.setData({hasMore:false,hasRefesh:false,});
                await hideLoading();
                wx.stopPullDownRefresh();
            return ;
        };
        if(err!=null){wx.showToast('系统异常'); hideLoading();return ;};
            this.setData({
                currentPage:1,
                list:[...data.data],
                hasMore:false,
                hasRefesh:false
            });
        await hideLoading();
        wx.stopPullDownRefresh();
    },
    onPageScroll: function(e) {
        if (e.scrollTop > 1000) {
            this.setData({
                backTop: true
            })
        } else {
            this.setData({
                backTop: false
            })
        }
    },
    backTopHandle() {
        if (wx.pageScrollTo) {
            wx.pageScrollTo({
                scrollTop: 0,
                duration: 500
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
        }
    },
})

//logs.js
const util = require('../../utils/util.js');
const regeneratorRuntime = require('../../utils/runtime');
import {getAllLabel,addLabel,deleteLabel} from '../../utils/service'
import {hideLoading, showLoading} from '../../utils/http';

Page({
    data: {
        data:''

    },
    onLoad: function () {
        console.log('label page is load')
        this.init();
    },
    async init(){
        await showLoading();
        let [err,data]=await getAllLabel();
        if(err!=null){wx.showToast({title:'系统错误'});hideLoading();return ;}
        console.log('allLabel',data)
        this.setData({
            data
        });
        await hideLoading();

    },
    //点击事件
    async handleAdd(){
        await showLoading();
        let [err,data]=await addLabel({label_id:1})
        if(err!=null){wx.showToast({title:'系统错误'});hideLoading();return }
        await hideLoading();
        wx.switchTab({
            url:'/pages/home/home'
        })

    },
    async handleDelete(){
        await showLoading();
        let [err,data]=await deleteLabel({label_id:1})
        if(err!=null){wx.showToast({title:'系统错误'});hideLoading();return }
        await hideLoading();
        wx.switchTab({
            url:'/pages/home/home'
        })
    }
})

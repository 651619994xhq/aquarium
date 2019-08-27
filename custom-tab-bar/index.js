//index.js
Component({
    data: {
        selected:0,
        color: "#333333",
        selectedColor: "#1D8CFF",
        list: [{
        pagePath: "/pages/home/home",
        iconPath:"/image/dis-home-page.png",
        selectedIconPath:"/image/home-page.png",
        text: "首页"
         },
        {
        pagePath: "/pages/mine/index",
        iconPath:"/image/dis-person.png",
        selectedIconPath:"/image/person.png",
        text: "我的"
        }]
    },
    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset
            const url = data.path;
            console.log('url==>',url,'  index==>',data.index)
            wx.switchTab({url})
            this.setData({
                selected: data.index
            })
        }
    }


})

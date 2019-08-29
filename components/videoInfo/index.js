//index.js
Component({
    properties:{
        itemInfo:{
             type:Object,
             value:{},
             observer: (newValue, oldValue, changedPath) => {
                // console.log(newValue);
                // console.log(oldValue)
            }
        }
    },
    // options: {
    //     addGlobalClass: true
    // },
    data: {
        current:0,
    },
    onLoad: function () {
    },
    methods:{
        handleGoVideoDetailPage(e){
            let id=e.currentTarget.dataset.id;
            wx.navigateTo({
                url: `/pages/videoDetail/index?id=${id}`
            })
            // wx.navigateTo({
            //     url: `/pages/label/index?id=${id}`
            // })
        }
    },
    // externalClasses: ['my-class']

})

//index.js
Component({
    properties:{
         test:{
             type:String,
             value:'',
             observer: (newValue, oldValue, changedPath) => {
                 console.log(newValue);
                 console.log(oldValue)
             }
         },
        userImg:{
             type:String,
             value: 'http://pic13.nipic.com/20110409/7119492_114440620000_2.jpg',
             observer: (newValue, oldValue, changedPath) => {
                console.log(newValue);
                console.log(oldValue)
             }
        },

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
        onTap(){
            var myEventDetail = {} // detail对象，提供给事件监听函数
            var myEventOption = {} // 触发事件的选项
            this.triggerEvent('myevent', '我是子组件')
        }
    },
    // externalClasses: ['my-class']

})

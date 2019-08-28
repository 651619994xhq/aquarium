const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//导出 函数节流 在指定的时间间隔内只执行一次任务
export function throttle(fn,delay){
  let last,timer;
  return function(){
    var that=this;
    let _args=arguments;
    let now= +new Date();
    if(last&&now<last+delay){
      clearTimeout(timer);
      timer=setTimeout(function () {
        last=now;
        fn.apply(that,_args);
      },delay)
    }else{
      last=now;
      fn.apply(that,_args);
    }
  }
}

export function debounce(fn,delay){
  let timer = null;
  return function(){
    let that = this;
    let _args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function(){
      fn.apply(that,_args);
    },delay)
  }
}


module.exports = {
  formatTime: formatTime,
  throttle,
  debounce,
}

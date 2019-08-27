import awaitWrap from './awaitWrap';
import {http} from './http';
import api from './api';

export const register=(param)=>{
    let username=param.username?param.username:'',password=param.password?param.password:'',name=param.name?param.name:'';
    return awaitWrap(http.post(api.REGISTER,{username,password,name}))
}

export const login=(param)=>{
    let code=param.code?param.code:'',user_info=param.user_info?param.user_info:'';
    return awaitWrap(http.post(api.LOAIN,{code,user_info}))
}

//获取喜欢的标签
export const getMyLabel=()=>{
    return awaitWrap(http.post(api.MY_LABEL,{}))
};
//获取所有的标签
export const getAllLabel=()=>{
    return awaitWrap(http.post(api.GET_ALL_LABEL))
}


//获取首页列表信息
export const getIndexInfo=(param)=>{
    let label=param.label?param.label:'',type=param.type?param.type:'',page=param.page?param.page:'';
    return awaitWrap(http.post(api.INDEX,{label,type,page}))
}

export const test=()=>{
    console.log('test==> is run')
    return awaitWrap(http.post(api.TEST,{}))
}

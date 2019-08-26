import awaitWrap from './awaitWrap';
import http from './http';
import api from './api';

export const register=(param)=>{
    let username=param.username?param.username:'',password=param.password?param.password:'',name=param.name?param.name:'';
    return awaitWrap(http.post(api.REGISTER,{username,password,name}))
}

export const login=(param)=>{
    let code=param.code?param.code:'',user_info=param.user_info?param.user_info:'';
    return awaitWrap(http.post(api.LOAIN,{code,user_info}))
}
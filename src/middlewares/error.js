import { message } from 'antd';
export default function errorMiddleware() {
  return (next) => (action) => {
    const { error } = action;
    // 当有错误信息时.则错误的action不再往外发送.
    if (error) {
      if (action.payload instanceof Error) {
        throw new Error(action.payload);
      } else {
        //  登录接口报错不用弹窗  设计说了算
        if (action.type !== 'LOGIN_LOGIN') {
          action.payload.msg && message.error(action.payload.msg);
        }
      }
    } else {
      return next(action);
    }
  };
}

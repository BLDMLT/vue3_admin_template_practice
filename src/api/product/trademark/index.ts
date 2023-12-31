// 品牌管理接口
import request from '@/utils/request'
import type { TradeMarkResponseData, TradeMark } from './type'
// 品牌管理模块接口地址
enum API {
  // 获取已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 添加品牌
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改已有品牌
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
}
// 获取已有品牌接口方法
// page: 获取第几页 --  默认第一页
// limit: 获取几个已有品牌的数据
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )

// 添加和修改已有品牌接口方法
export const reqAddOrUpdateTradeMark = (data: TradeMark) => {
  // 修改已有品牌
  if (data.id) {
    // <any, any> 第二个为返回类型ts
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    // 新增品牌
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}

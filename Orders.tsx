
import React from 'react';
import { ORDERS, SHOPS } from '../constants';

const Orders: React.FC = () => {
  const getShopName = (id: string) => SHOPS.find(s => s.id === id)?.name || '未知店铺';

  return (
    <div className="space-y-6 animate-fadeIn">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">订单管理</h2>
          <p className="text-slate-500">跨渠道管理您最近的所有销售订单。</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="搜索订单..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
          <button className="px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-semibold hover:bg-slate-700 transition-colors flex items-center gap-2">
            <i className="fa-solid fa-download"></i>
            导出 CSV
          </button>
        </div>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase">订单 ID</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase">所属店铺</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase">客户名称</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase">商品详情</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase">下单日期</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase">状态</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase">金额</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ORDERS.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4 font-mono text-sm text-slate-500">{order.id}</td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-700">{getShopName(order.shopId)}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{order.customerName}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{order.items.join(', ')}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{order.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    order.status === 'shipped' ? 'bg-emerald-100 text-emerald-700' : 
                    order.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {order.status === 'shipped' ? '已发货' : order.status === 'pending' ? '待处理' : '处理中'}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-slate-800">¥{order.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;

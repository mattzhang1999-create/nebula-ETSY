
import React from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { SHOPS, DAILY_STATS } from '../constants';

const Dashboard: React.FC = () => {
  const totalRevenue = SHOPS.reduce((acc, shop) => acc + shop.revenue, 0);
  const totalOrders = SHOPS.reduce((acc, shop) => acc + shop.orders, 0);
  const avgConversion = SHOPS.reduce((acc, shop) => acc + shop.conversionRate, 0) / SHOPS.length;

  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h2 className="text-3xl font-bold text-slate-800">全局概览</h2>
        <p className="text-slate-500">实时监控所有已连接 Etsy 店铺的经营表现。</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="p-2 bg-orange-100 text-orange-600 rounded-lg"><i className="fa-solid fa-dollar-sign"></i></span>
            <span className="text-emerald-500 text-sm font-bold">+12.5%</span>
          </div>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">总营业额</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">¥{totalRevenue.toLocaleString()}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="p-2 bg-blue-100 text-blue-600 rounded-lg"><i className="fa-solid fa-shopping-bag"></i></span>
            <span className="text-emerald-500 text-sm font-bold">+8.2%</span>
          </div>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">总订单数</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{totalOrders.toLocaleString()}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="p-2 bg-purple-100 text-purple-600 rounded-lg"><i className="fa-solid fa-users"></i></span>
            <span className="text-rose-500 text-sm font-bold">-2.1%</span>
          </div>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">总访客数</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">14,300</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="p-2 bg-amber-100 text-amber-600 rounded-lg"><i className="fa-solid fa-percent"></i></span>
            <span className="text-emerald-500 text-sm font-bold">+0.4%</span>
          </div>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">平均转化率</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{avgConversion.toFixed(1)}%</h3>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-8">
          <h4 className="text-lg font-bold text-slate-800">收入增长趋势</h4>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-600">7天</button>
            <button className="px-4 py-1.5 text-xs font-semibold rounded-full bg-orange-600 text-white shadow-lg shadow-orange-200">30天</button>
          </div>
        </div>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DAILY_STATS}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ea580c" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip 
                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                labelFormatter={(value) => `日期: ${value}`}
                formatter={(value: any) => [`¥${value}`, '营业额']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#ea580c" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Shop Summary Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h4 className="text-lg font-bold text-slate-800">店铺绩效详情</h4>
          <button className="text-orange-600 text-sm font-semibold hover:underline">查看所有店铺</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">店铺名称</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">订单量</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">转化率</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">累计收入</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SHOPS.map((shop) => (
                <tr key={shop.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={shop.avatar} className="w-10 h-10 rounded-xl shadow-sm" alt={shop.name} />
                      <span className="font-semibold text-slate-700">{shop.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      shop.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 
                      shop.status === 'vacation' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {shop.status === 'active' ? '运营中' : shop.status === 'vacation' ? '休假中' : '未激活'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{shop.orders}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="bg-orange-500 h-full" style={{width: `${shop.conversionRate * 10}%`}}></div>
                      </div>
                      <span className="text-sm font-medium text-slate-600">{shop.conversionRate}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-800">¥{shop.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
